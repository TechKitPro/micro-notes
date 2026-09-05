---
title: 使用 Hexo 搭建个人博客的完整指南
date: 2026-09-05 15:00:00
categories:
- 教程
tags:
- Hexo
- 博客
- GitHub Pages
---

本文记录使用 Hexo 搭建个人博客并部署到 GitHub Pages 的完整流程。

## 什么是 Hexo

Hexo 是一个快速、简洁且高效的博客框架，使用 Markdown 解析文章，几秒内即可生成静态网页。

## 环境准备

- Node.js (建议 14.0 及以上版本)
- Git

## 安装 Hexo

```bash
npm install -g hexo-cli
```

## 初始化博客

```bash
hexo init my-blog
cd my-blog
npm install
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `hexo new "标题"` | 新建文章 |
| `hexo generate` | 生成静态文件 |
| `hexo server` | 启动本地服务器 |
| `hexo deploy` | 部署网站 |
| `hexo clean` | 清除缓存 |

## 配置站点

编辑 `_config.yml` 文件，设置站点标题、描述、作者等信息：

```yaml
title: 我的博客
subtitle: 记录生活与技术
description: 这是我的个人博客
author: Your Name
language: zh-CN
timezone: Asia/Shanghai
```

## 部署到 GitHub Pages

1. 在 GitHub 创建仓库
2. 安装部署插件：

```bash
npm install hexo-deployer-git --save
```

3. 配置 `_config.yml`：

```yaml
deploy:
  type: git
  repo: https://github.com/username/repo.git
  branch: gh-pages
```

4. 执行部署：

```bash
hexo clean && hexo generate && hexo deploy
```

## 总结

Hexo 是一个优秀的静态博客生成器，配合 GitHub Pages 可以免费搭建个人博客。更多内容请参考 [Hexo 官方文档](https://hexo.io/docs/)。
