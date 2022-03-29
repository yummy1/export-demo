<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button :loading="downloadWordLoading1" type="primary" @click="exportWord">导出word文章</el-button>
        <el-button :loading="downloadWordLoading2" type="primary" @click="exportWord2">导出word表格</el-button>
      </el-form-item>
    </el-form>
    <h6 class="work">技术方案：使用jquery</h6>
    <p class="result-success">结果：导出文章可以实现，导出表格字段多会显示不全</p>
    <el-table
      id="export_word2"
      key="single"
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
    <index2-content id="export_word" :is-components="true" />
  </div>
</template>
<script>
import $ from 'jquery'
import '@/utils/jquery.wordexport'
import Index2Content from '../export-pdf/components/Index2Content.vue'
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
  name: '',
  components: { Index2Content },
  data() {
    return {
      tableHeader,
      list: null,
      listLoading: true,
      downloadWordLoading1: false,
      downloadWordLoading2: false
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
    exportWord() {
      this.downloadWordLoading1 = true
      this.$nextTick(() => {
        $('#export_word').wordExport('导出word')
        this.downloadWordLoading1 = false
      }, 500)
    },
    exportWord2() {
      this.downloadWordLoading2 = true
      this.$nextTick(() => {
        $('#export_word2').wordExport('导出word')
        this.downloadWordLoading2 = false
      }, 500)
    }
  }
}
</script>
<style lang="scss">

</style>
