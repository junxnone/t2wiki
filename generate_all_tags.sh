#!/bin/bash

# 为所有标签生成页面

cd "$(dirname "$0")/docs"

# 创建tags目录
mkdir -p tags

# 从所有issue文件中提取标签和文章信息
declare -A tag_articles

while IFS= read -r file; do
    # 提取标题
    title=$(grep "^title:" "$file" | sed 's/title: //')
    # 提取issue编号
    number=$(grep "^issue_number:" "$file" | sed 's/issue_number: //')
    # 提取作者
    author=$(grep "^author:" "$file" | sed 's/author: //')
    # 提取更新时间
    updated=$(grep "^updated_at:" "$file" | sed 's/updated_at: //')
    # 提取标签
    labels=$(grep "^labels:" "$file" | sed 's/labels: \[//' | sed 's/\]//')

    # 将标签分割并处理每个标签
    IFS=',' read -ra LABEL_ARRAY <<< "$labels"
    for label in "${LABEL_ARRAY[@]}"; do
        label=$(echo "$label" | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')

        # 记录这个标签和文章的关系
        if [ -n "$label" ]; then
            tag_articles["$label"]+="$title|$number|$author|$updated|$labels;"
        fi
    done
done < <(ls issue-*.md 2>/dev/null)

# 为每个标签生成页面
for tag in "${!tag_articles[@]}"; do
    tag_file="tags/${tag}.md"

    # 计算文章数量
    article_data="${tag_articles[$tag]}"
    count=$(echo "$article_data" | tr ';' '\n' | grep -c .)

    # 生成标签页面
    echo "# ${tag}" > "$tag_file"
    echo "" >> "$tag_file"
    echo "共 ${count} 篇文章" >> "$tag_file"
    echo "" >> "$tag_file"
    echo "---" >> "$tag_file"
    echo "" >> "$tag_file"

    # 处理每篇文章
    IFS=';' read -ra ARTICLES <<< "$article_data"
    for article in "${ARTICLES[@]}"; do
        if [ -n "$article" ]; then
            IFS='|' read -ra INFO <<< "$article"
            title="${INFO[0]}"
            number="${INFO[1]}"
            author="${INFO[2]}"
            updated="${INFO[3]}"
            all_labels="${INFO[4]}"

            # 生成其他标签列表（排除当前标签）- 使用Docsify hash路由
            other_labels=""
            IFS=',' read -ra LABEL_LIST <<< "$all_labels"
            for lbl in "${LABEL_LIST[@]}"; do
                lbl=$(echo "$lbl" | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')
                if [ "$lbl" != "$tag" ] && [ -n "$lbl" ]; then
                    # URL encode标签名
                    encoded_lbl=$(echo "$lbl" | sed 's/ /%20/g')
                    other_labels+="[$lbl](#/tags/${encoded_lbl}), "
                fi
            done
            # 移除最后的逗号和空格
            other_labels=$(echo "$other_labels" | sed 's/, $//')

            # 转换日期格式
            update_date=$(date -d "${updated%Z}" "+%Y/%m/%d" 2>/dev/null || echo "$updated")

            # 写入文章信息（使用Docsify的hash路由格式）
            echo "## [${title}](#/issue-${number})" >> "$tag_file"
            echo "" >> "$tag_file"
            if [ -n "$other_labels" ]; then
                echo "**其他标签**: ${other_labels}" >> "$tag_file"
                echo "" >> "$tag_file"
            fi
            echo "**作者**: ${author} | **更新**: ${update_date}" >> "$tag_file"
            echo "" >> "$tag_file"
            echo "---" >> "$tag_file"
            echo "" >> "$tag_file"
        fi
    done

    echo "" >> "$tag_file"
    echo "[← 返回标签索引](#/tags)" >> "$tag_file"

    echo "Generated: $tag_file"
done

echo ""
echo "完成！共生成 ${#tag_articles[@]} 个标签页面"
