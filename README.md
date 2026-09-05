# Micro Notes

基于 [Hexo](https://hexo.io/) + [Anzhiyu 主题](https://github.com/anzhiyu-c/hexo-theme-anzhiyu) 构建的技术笔记博客，部署于 GitHub Pages。

## 环境要求

- Node.js >= 14.0
- Git

## 本地开发

```bash
# 安装依赖
npm install

# 启动本地预览服务器 (http://localhost:4000)
npm run server

# 生成静态文件
npm run build

# 清理缓存
npm run clean
```

## 写作

```bash
# 新建文章
hexo new "文章标题"

# 新建页面
hexo new page "页面名称"
```

文章位于 `source/_posts/` 目录，使用 Markdown 格式编写。

## 部署到 GitHub Pages

```bash
# 安装部署插件（已包含在依赖中）
npm install hexo-deployer-git --save

# 一键生成并部署
npm run build
npm run deploy
```

部署配置位于 `_config.yml`：

```yaml
deploy:
  type: git
  repo: https://github.com/TechKitPro/micro-notes.git
  branch: gh-pages
```

部署后，在 GitHub 仓库 Settings → Pages 中选择 `gh-pages` 分支作为发布源。

## 项目结构

```
.
├── _config.yml              # 站点配置
├── _config.anzhiyu.yml      # Anzhiyu 主题配置
├── source/
│   ├── _posts/              # 文章
│   ├── _drafts/             # 草稿
│   └── about/               # 关于页面
├── themes/
│   └── anzhiyu/             # Anzhiyu 主题
├── scaffolds/               # 模板
└── public/                  # 生成的静态文件（不提交）
```

## 许可

MIT
