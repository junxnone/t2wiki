#!/usr/bin/env python3
"""模拟GitHub Action生成侧边栏和标签页面的逻辑"""

import os
import re
from datetime import datetime
from urllib.parse import quote

docs_dir = 'docs'

# 读取所有issue文件
issue_files = [f for f in os.listdir(docs_dir) if f.startswith('issue-') and f.endswith('.md')]

all_issues = []

# 解析每个issue文件
for file in issue_files:
    filepath = os.path.join(docs_dir, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 提取frontmatter
    frontmatter_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not frontmatter_match:
        continue

    frontmatter = frontmatter_match.group(1)

    # 解析字段
    title_match = re.search(r'title:\s*(.+)', frontmatter)
    number_match = re.search(r'issue_number:\s*(\d+)', frontmatter)
    author_match = re.search(r'author:\s*(.+)', frontmatter)
    created_match = re.search(r'created_at:\s*(.+)', frontmatter)
    updated_match = re.search(r'updated_at:\s*(.+)', frontmatter)
    labels_match = re.search(r'labels:\s*\[(.*?)\]', frontmatter)

    if not title_match or not number_match:
        continue

    issue = {
        'number': int(number_match.group(1)),
        'title': title_match.group(1),
        'displayTitle': title_match.group(1),
        'user': {'login': author_match.group(1) if author_match else 'unknown'},
        'created_at': created_match.group(1) if created_match else '',
        'updated_at': updated_match.group(1) if updated_match else '',
        'labels': []
    }

    # 解析标签
    if labels_match:
        labels_str = labels_match.group(1)
        labels = [l.strip() for l in labels_str.split(',')]
        issue['labels'] = [{'name': l} for l in labels]

    all_issues.append(issue)

print(f"Found {len(all_issues)} issues")

# 按标签分组
issues_by_label = {}
issues_without_label = []

for issue in all_issues:
    all_labels = set()

    # 添加GitHub标签
    for label in issue['labels']:
        all_labels.add(label['name'])

    if len(all_labels) == 0:
        issues_without_label.append(issue)
    else:
        for label in all_labels:
            if label not in issues_by_label:
                issues_by_label[label] = []
            issues_by_label[label].append(issue)

# 生成侧边栏
sidebar_content = '<!-- 此文件由 GitHub Actions 自动生成 -->\n\n'
sidebar_content += '- [首页](/)\n'
sidebar_content += '- [标签索引](tags.md)\n\n'

if len(issues_by_label) == 0 and len(issues_without_label) == 0:
    sidebar_content += '## 文档列表\n\n*暂无文档，请创建 Issue 来添加内容*\n'
else:
    # 按标签分类显示
    sorted_labels = sorted(issues_by_label.keys())
    for label in sorted_labels:
        sidebar_content += f"## {label}\n\n"
        for issue in issues_by_label[label]:
            sidebar_content += f"- [{issue['displayTitle']}](issue-{issue['number']}.md)\n"
        sidebar_content += '\n'

    # 未分类的issues
    if len(issues_without_label) > 0:
        sidebar_content += '## 未分类\n\n'
        for issue in issues_without_label:
            sidebar_content += f"- [{issue['displayTitle']}](issue-{issue['number']}.md)\n"

with open(os.path.join(docs_dir, '_sidebar.md'), 'w', encoding='utf-8') as f:
    f.write(sidebar_content)
print('Updated sidebar')

# 生成标签索引页面
sorted_labels = sorted(issues_by_label.keys())
tags_index_content = '# 标签索引\n\n'
tags_index_content += '点击标签查看相关文章。\n\n'
tags_index_content += '---\n\n'

if len(sorted_labels) > 0:
    for label in sorted_labels:
        count = len(issues_by_label[label])
        tags_index_content += f"## [{label}](tags/{quote(label)}.md) ({count})\n\n"
else:
    tags_index_content += '*暂无标签*\n'

with open(os.path.join(docs_dir, 'tags.md'), 'w', encoding='utf-8') as f:
    f.write(tags_index_content)
print('Updated tags index')

# 创建tags目录
tags_dir = os.path.join(docs_dir, 'tags')
if not os.path.exists(tags_dir):
    os.makedirs(tags_dir)

# 清理旧的标签文件
existing_tag_files = [f for f in os.listdir(tags_dir) if f.endswith('.md')]
for file in existing_tag_files:
    os.remove(os.path.join(tags_dir, file))

# 为每个标签生成单独的页面
for label in sorted_labels:
    issues = issues_by_label[label]
    tag_content = f"# {label}\n\n"
    tag_content += f"共 {len(issues)} 篇文章\n\n"
    tag_content += '---\n\n'

    for issue in issues:
        labels = set()
        for l in issue['labels']:
            labels.add(l['name'])
        labels_array = [l for l in labels if l != label]

        tag_content += f"## [{issue['displayTitle']}](../issue-{issue['number']}.md)\n\n"
        if len(labels_array) > 0:
            tag_content += '**其他标签**: '
            tag_content += ', '.join([f"[{l}]({quote(l)}.md)" for l in labels_array])
            tag_content += '\n\n'

        # 解析日期
        try:
            updated_date = datetime.fromisoformat(issue['updated_at'].replace('Z', '+00:00'))
            date_str = updated_date.strftime('%Y/%m/%d')
        except:
            date_str = issue['updated_at']

        tag_content += f"**作者**: {issue['user']['login']} | **更新**: {date_str}\n\n"
        tag_content += '---\n\n'

    tag_content += '\n[← 返回标签索引](../tags.md)\n'

    tag_filename = f"{label}.md"
    with open(os.path.join(tags_dir, tag_filename), 'w', encoding='utf-8') as f:
        f.write(tag_content)

print(f"Generated {len(sorted_labels)} tag pages")
print('\nDone!')
