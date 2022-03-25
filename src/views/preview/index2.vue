<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="onPreviewExcel">预览Excel</el-button>
        <el-button type="primary" @click="onPreviewWord">预览Word</el-button>
        <el-button type="primary" @click="onPreviewPDF">预览PDF</el-button>
      </el-form-item>
    </el-form>
    <p class="work">技术方案：前端借助https://view.officeapps.live.com/实现excel、word在线预览</p>
    <p class="result-info">结果：控制台报错，方案不可用</p>
  </div>
</template>

<script>

export default {
  name: 'Pdf1',
  methods: {
    onPreviewExcel() {
    //   this.$router.push({ path: '/preview-detail', query: { url: 'http://101.43.196.129/excel.xlsx' }})
      const urlNew = encodeURIComponent('http://101.43.196.129/excel.xlsx')
      const urls = 'http://view.officeapps.live.com/op/view.aspx?src=' + urlNew
      window.open(urls, '_target')
    },
    onPreviewWord() {
      this.$router.push({ path: '/preview-detail', query: { url: 'http://101.43.196.129/123.docx' }})
    },
    onPreviewPDF() {
      window.location.href = 'http://101.43.196.129/pdf.pdf'
    }
  }
}
</script>
