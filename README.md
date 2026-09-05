# Micro Notes

基于 [Hugo](https://gohugo.io/) + [Stack 主题](https://github.com/CaiJimmy/hugo-theme-stack) 构建的技术笔记博客，部署于 Cloudflare Pages。

## 环境要求

- Hugo Extended >= 0.165.0
- Git

## 本地开发

```bash
# 启动本地预览 (http://localhost:1313)
hugo server

# 包含草稿预览
hugo server --buildDrafts

# 生成静态文件
hugo --minify
```

## 写作

```bash
# 新建文章
hugo new content posts/文章标题.md
```

文章位于 `content/posts/` 目录，使用 Markdown 格式编写。

## 项目结构

```
.
├── hugo.toml              # 站点配置
├── content/
│   ├── posts/             # 文章
│   └── about.md           # 关于页面
├── themes/
│   └── stack/             # Stack 主题
├── static/                # 静态资源
├── archetypes/            # 文章模板
└── public/                # 生成的静态文件（不提交）
```

## Cloudflare Pages 部署

| 配置项 | 值 |
|--------|-----|
| 构建命令 | `hugo --minify` |
| 输出目录 | `public` |
| 环境变量 | `HUGO_VERSION = 0.165.0` |

推送到 main 分支后自动构建部署。

## 许可

MIT
