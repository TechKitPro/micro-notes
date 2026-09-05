# Micro Notes

基于 [Hugo](https://gohugo.io/) + [PaperMod](https://github.com/adityatelange/hugo-PaperMod) 主题构建的技术笔记博客，部署于 Cloudflare Pages。

## 环境要求

- Hugo Extended >= 0.165.0
- Git

## 本地开发

```bash
# 启动本地预览 (http://localhost:1313)
hugo server

# 包含草稿
hugo server -D

# 生成静态文件
hugo --minify
```

## 写作

```bash
# 新建文章
hugo new posts/文章标题.md
```

文章位于 `content/posts/` 目录，使用 Markdown 格式编写。

## 部署到 Cloudflare Pages

- 构建命令：`hugo --minify`
- 构建输出目录：`public`
- 环境变量：`HUGO_VERSION = 0.165.0`

## 项目结构

```
.
├── hugo.toml              # 站点配置
├── content/
│   ├── posts/             # 文章
│   ├── about/             # 关于页面
│   └── archives.md        # 归档页
├── themes/
│   └── PaperMod/          # PaperMod 主题
├── static/                # 静态资源
└── public/                # 生成的静态文件（不提交）
```

## 许可

MIT
