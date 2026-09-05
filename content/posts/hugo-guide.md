---
title: "使用 Hugo 搭建个人博客的完整指南"
date: 2026-09-05T15:00:00+08:00
categories: ["教程"]
tags: ["Hugo", "博客", "Cloudflare Pages"]
draft: false
---

本文记录使用 Hugo 搭建个人博客并部署到 Cloudflare Pages 的完整流程。

## 什么是 Hugo

Hugo 是一个用 Go 语言编写的静态网站生成器，以构建速度极快而著称，几秒内即可生成数千个页面。

## 环境准备

- Hugo（建议 Extended 版本）
- Git

## 安装 Hugo

Windows 下可从 [Hugo Releases](https://github.com/gohugoio/hugo/releases) 下载预编译版本，或使用包管理器：

```bash
winget install Hugo.Hugo.Extended
```

## 初始化博客

```bash
hugo new site my-blog
cd my-blog
```

## 安装主题

以 PaperMod 主题为例：

```bash
git clone https://github.com/adityatelange/hugo-PaperMod themes/PaperMod --depth=1
```

然后在 `hugo.toml` 中设置：

```toml
theme = 'PaperMod'
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `hugo new posts/标题.md` | 新建文章 |
| `hugo` | 生成静态文件 |
| `hugo server` | 启动本地服务器 |
| `hugo server -D` | 包含草稿预览 |
| `hugo --minify` | 压缩生成 |

## 配置站点

编辑 `hugo.toml` 文件，设置站点标题、语言、菜单等：

```toml
baseURL = 'https://example.com/'
title = '我的博客'
theme = 'PaperMod'
defaultContentLanguage = 'zh'
```

## 部署到 Cloudflare Pages

1. 将代码推送到 GitHub
2. 在 Cloudflare Pages 连接仓库
3. 构建配置：
   - 构建命令：`hugo --minify`
   - 构建输出目录：`public`
4. 环境变量添加 `HUGO_VERSION = 0.165.0`

保存后自动部署。

## 总结

Hugo 是一个高性能的静态博客生成器，配合 Cloudflare Pages 可以免费快速搭建个人博客。更多内容请参考 [Hugo 官方文档](https://gohugo.io/documentation/)。
