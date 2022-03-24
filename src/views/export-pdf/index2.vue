<template>
  <div v-loading.lock="fullscreenLoading" element-loading-text="Efforts to generate PDF" class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="onExportPDF1">导出PDF1</el-button>
        <el-button :loading="downloadPDFLoading2" type="primary" @click="onExportPDF2">导出PDF2</el-button>
      </el-form-item>
    </el-form>
    <p class="work">技术方案：<br>1.系统方法window.print()<br>2.html2canvas + jspdf + file-saver</p>
    <p class="result-info">结果：方法1适合单页场景；方法2适合单页或固定dom页面，否则会出现切割</p>
    <index2-content :is-components="true" />
    <!-- <h2 id="pdfDom">你好</h2> -->
  </div>
</template>

<script>
import Index2Content from './components/Index2Content.vue'
export default {
  name: 'Pdf2',
  components: { Index2Content },
  data() {
    return {
      article: '',
      fullscreenLoading: true,
      downloadPDFLoading2: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      import('./content2.js').then(data => {
        const { title } = data.default
        document.title = title
        this.article = data.default
        setTimeout(() => {
          this.fullscreenLoading = false
        }, 1000)
      })
    },
    onExportPDF1() {
      this.$router.push('/export/pdf1-content')
    },
    onExportPDF2() {
      this.downloadPDFLoading2 = true
      this.$getPdf().then(() => {
        this.downloadPDFLoading2 = false
      })
    }
  }
}
</script>
