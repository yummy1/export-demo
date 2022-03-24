# 导出 demo

## 导出 excel

- xlsx + file-saver，完美实现

## 导出 pdf

- html2canvas + jspdf + file-saver，适合手机端或页面计较少的情况
- XDOC 文档模板云服务，第三方很完美

## 导出 pdf

- html2canvas + jspdf + file-saver，适合手机端或页面计较少的情况
- XDOC 文档模板云服务，第三方很完美

## 导出 word

- docxtemplater + jszip-utils + jszip + file-saver，完美实现，需要建好 word 模板
- mhtml-to-word， 样式不行，而且不适合桌面端
- XDOC 文档模板云服务，第三方很完美

---

> 还可以先生成 word 再导出 pdf 来实现，目前没有找到合适的 js 方法来实现 word 生成 pdf

# Build Setup

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-admin-template.git

# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

# 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

# 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```
