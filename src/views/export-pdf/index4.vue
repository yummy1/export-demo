<template>
  <div v-loading.lock="fullscreenLoading" element-loading-text="Efforts to generate PDF" class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button :loading="downloadPDFLoading2" type="primary" @click="onExportPDF2">导出PDF</el-button>
      </el-form-item>
    </el-form>
    <p class="work">技术方案：jspdf</p>
    <index2-content :is-components="true" />
    <!-- <h2 id="pdfDom">你好</h2> -->
  </div>
</template>

<script>
import Index2Content from './components/Index2Content.vue'
import JsPDF from 'jspdf'
export default {
  name: 'Pdf4',
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
    onExportPDF2() {
      this.downloadPDFLoading2 = true
      var doc = new JsPDF('p', 'pt', 'a4')
      doc.html(document.getElementById('pdfDom'), {
        callback: (doc) => {
          doc.save('exportPdf4.pdf')
          this.downloadPDFLoading2 = false
        },
        margin: 10,
        filename: 'exportPdf4',
        autoPaging: true,
        html2canvas: { allowTaint: true }
      })
    }
  }
}
</script>
