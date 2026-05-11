// 模拟GitHub Action生成侧边栏和标签页面的逻辑
const fs = require('fs');
const path = require('path');

const docsDir = 'docs';

// 读取所有issue文件
const issueFiles = fs.readdirSync(docsDir)
  .filter(file => file.startsWith('issue-') && file.endsWith('.md'));

const allIssues = [];

// 解析每个issue文件
issueFiles.forEach(file => {
  const content = fs.readFileSync(path.join(docsDir, file), 'utf8');

  // 提取frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return;

  const frontmatter = frontmatterMatch[1];

  // 解析字段
  const titleMatch = frontmatter.match(/title:\s*(.+)/);
  const numberMatch = frontmatter.match(/issue_number:\s*(\d+)/);
  const authorMatch = frontmatter.match(/author:\s*(.+)/);
  const createdMatch = frontmatter.match(/created_at:\s*(.+)/);
  const updatedMatch = frontmatter.match(/updated_at:\s*(.+)/);
  const labelsMatch = frontmatter.match(/labels:\s*\[(.*)\]/);

  if (!titleMatch || !numberMatch) return;

  const issue = {
    number: parseInt(numberMatch[1]),
    title: titleMatch[1],
    displayTitle: titleMatch[1],
    user: { login: authorMatch ? authorMatch[1] : 'unknown' },
    created_at: createdMatch ? createdMatch[1] : '',
    updated_at: updatedMatch ? updatedMatch[1] : '',
    labels: []
  };

  // 解析标签
  if (labelsMatch) {
    const labelsStr = labelsMatch[1];
    issue.labels = labelsStr.split(',').map(l => ({ name: l.trim() }));
  }

  allIssues.push(issue);
});

console.log(`Found ${allIssues.length} issues`);

// 按标签分组
const issuesByLabel = {};
const issuesWithoutLabel = [];

allIssues.forEach(issue => {
  const allLabels = new Set();

  // 添加GitHub标签
  issue.labels.forEach(label => allLabels.add(label.name));

  if (allLabels.size === 0) {
    issuesWithoutLabel.push(issue);
  } else {
    allLabels.forEach(label => {
      if (!issuesByLabel[label]) {
        issuesByLabel[label] = [];
      }
      issuesByLabel[label].push(issue);
    });
  }
});

// 生成侧边栏
let sidebarContent = '<!-- 此文件由 GitHub Actions 自动生成 -->\n\n';
sidebarContent += '- [首页](/)\n';
sidebarContent += '- [标签索引](tags.md)\n\n';

if (Object.keys(issuesByLabel).length === 0 && issuesWithoutLabel.length === 0) {
  sidebarContent += '## 文档列表\n\n*暂无文档，请创建 Issue 来添加内容*\n';
} else {
  // 按标签分类显示
  const sortedLabels = Object.keys(issuesByLabel).sort();
  sortedLabels.forEach(label => {
    sidebarContent += `## ${label}\n\n`;
    issuesByLabel[label].forEach(issue => {
      sidebarContent += `- [${issue.displayTitle}](issue-${issue.number}.md)\n`;
    });
    sidebarContent += '\n';
  });

  // 未分类的issues
  if (issuesWithoutLabel.length > 0) {
    sidebarContent += '## 未分类\n\n';
    issuesWithoutLabel.forEach(issue => {
      sidebarContent += `- [${issue.displayTitle}](issue-${issue.number}.md)\n`;
    });
  }
}

fs.writeFileSync(path.join(docsDir, '_sidebar.md'), sidebarContent, 'utf8');
console.log('Updated sidebar');

// 生成标签索引页面
const sortedLabels = Object.keys(issuesByLabel).sort();
let tagsIndexContent = '# 标签索引\n\n';
tagsIndexContent += '点击标签查看相关文章。\n\n';
tagsIndexContent += '---\n\n';

if (sortedLabels.length > 0) {
  sortedLabels.forEach(label => {
    const count = issuesByLabel[label].length;
    tagsIndexContent += `## [${label}](tags/${encodeURIComponent(label)}.md) (${count})\n\n`;
  });
} else {
  tagsIndexContent += '*暂无标签*\n';
}

fs.writeFileSync(path.join(docsDir, 'tags.md'), tagsIndexContent, 'utf8');
console.log('Updated tags index');

// 创建tags目录
const tagsDir = path.join(docsDir, 'tags');
if (!fs.existsSync(tagsDir)) {
  fs.mkdirSync(tagsDir, { recursive: true });
}

// 清理旧的标签文件
const existingTagFiles = fs.readdirSync(tagsDir).filter(f => f.endsWith('.md'));
existingTagFiles.forEach(file => {
  fs.unlinkSync(path.join(tagsDir, file));
});

// 为每个标签生成单独的页面
sortedLabels.forEach(label => {
  const issues = issuesByLabel[label];
  let tagContent = `# ${label}\n\n`;
  tagContent += `共 ${issues.length} 篇文章\n\n`;
  tagContent += '---\n\n';

  issues.forEach(issue => {
    const labels = new Set();
    issue.labels.forEach(l => labels.add(l.name));
    const labelsArray = Array.from(labels).filter(l => l !== label);

    tagContent += `## [${issue.displayTitle}](../issue-${issue.number}.md)\n\n`;
    if (labelsArray.length > 0) {
      tagContent += '**其他标签**: ';
      tagContent += labelsArray.map(l => `[${l}](${encodeURIComponent(l)}.md)`).join(', ');
      tagContent += '\n\n';
    }
    tagContent += `**作者**: ${issue.user.login} | **更新**: ${new Date(issue.updated_at).toLocaleDateString()}\n\n`;
    tagContent += '---\n\n';
  });

  tagContent += '\n[← 返回标签索引](../tags.md)\n';

  const tagFileName = `${label}.md`;
  fs.writeFileSync(path.join(tagsDir, tagFileName), tagContent, 'utf8');
});

console.log(`Generated ${sortedLabels.length} tag pages`);
console.log('\nDone!');
