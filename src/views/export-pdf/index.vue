<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button :loading="downloadPDFLoading1" type="primary" @click="onExportPDF1">导出PDF1</el-button>
        <el-button :loading="downloadPDFLoading2" type="primary" @click="onExportPDF2">导出PDF2</el-button>
      </el-form-item>
    </el-form>
    <p class="work">技术方案：<br>1.系统方法window.print()<br>2.html2canvas + jspdf + file-saver</p>
    <p class="result-info">结果：不适合表头较多的场景，适合场景看pdf2</p>
    <el-table
      id="pdfDom"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        v-for="(item, index) in tableHeader"
        :key="index"
        :align="item.align"
        :label="item.name"
        :prop="item.key"
        :width="item.width"
      />
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
const tableHeader = [
  {
    key: 'year',
    name: '年',
    align: 'center',
    width: 90
  },
  {
    key: 'month',
    name: '月',
    align: 'center',
    width: 90
  },
  {
    key: 'admission_no',
    name: '流水号',
    align: 'center',
    width: 120
  },
  {
    key: 'medical_record_id',
    name: '病案号',
    align: 'center',
    width: 120
  },
  {
    key: 'patient_name',
    name: '患者姓名',
    align: 'center',
    width: 120
  },
  {
    key: 'bmi_code',
    name: '统筹区编码',
    align: 'center',
    width: 120
  },
  {
    key: 'bmi_name',
    name: '统筹区名称',
    align: 'center',
    width: 150
  },
  {
    key: 'discharge_disease_id',
    name: '主诊断编码',
    align: 'center',
    width: 120
  },
  {
    key: 'discharge_disease_name',
    name: '主诊断名称',
    align: 'center',
    width: 120
  },
  {
    key: 'dept_name',
    name: '科室名称',
    align: 'center',
    width: 120
  },
  {
    key: 'doctor_group_name',
    name: '医师小组',
    align: 'center',
    width: 150
  }
]
export default {
  name: 'Pdf1',
  data() {
    return {
      tableHeader,
      list: null,
      listLoading: true,
      downloadPDFLoading1: false,
      downloadPDFLoading2: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    onExportPDF1() {
      this.downloadPDFLoading1 = true
      window.print()
      this.downloadPDFLoading1 = false
    },
    onExportPDF2() {
      this.downloadPDFLoading2 = true
      this.$getPdf()
      this.downloadPDFLoading2 = false
    }
  }
}
</script>
