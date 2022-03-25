<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button :loading="downloadExcelLoading1" type="primary" @click="onExportExcel">导出excel</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button :loading="downloadExcelLoading1" :type="isMore ? '': 'success'" plain @click="changeTableHeader(0)">单表头</el-button>
        <el-button :loading="downloadExcelLoading1" :type="isMore ? 'success': ''" @click="changeTableHeader(1)">多表头</el-button>
      </el-form-item>
    </el-form>
    <p class="work">技术方案：xlsx + file-saver</p>
    <p class="result-success">结果：完美实现单级表头和多级表头的导出，适合导出当页数据的情况</p>
    <el-table
      v-if="!isMore"
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
    <el-table
      v-else
      key="more"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <template v-for="(item, index) in tableHeader1">
        <el-table-column
          :key="index"
          :align="item.align"
          :label="item.name"
          :prop="item.key"
          :width="item.width"
        >
          <template v-if="item.children">
            <el-table-column
              v-for="(subItem, subIndex) in item.children"
              :key="subIndex"
              :align="subItem.align"
              :label="subItem.name"
              :prop="subItem.key"
              :width="subItem.width"
            />
          </template>
        </el-table-column>
      </template>
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
const tableHeader1 = [
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
    key: 'bmi',
    name: '统筹区',
    children: [
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
      }
    ]
  },
  {
    key: 'discharge_disease',
    name: '主诊断',
    children: [
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
      }
    ]
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
import _ from 'lodash'
export default {
  name: 'Excel1',
  data() {
    return {
      tableHeader,
      tableHeader1,
      list: null,
      listLoading: true,
      downloadExcelLoading1: false,
      isMore: false
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
    changeTableHeader(type) {
      this.isMore = type !== 0
    },
    onExportExcel() {
      this.downloadExcelLoading1 = true
      import('@/utils/Export2Excel').then(excel => {
        if (this.isMore) {
          const multiHeader = [this.tableHeader1.reduce((pre, cur) => {
            if (cur.children) {
              pre.push(cur.name)
              pre.push('')
              return pre
            } else {
              pre.push(cur.name)
              return pre
            }
          }, [])]
          const header = this.tableHeader1.reduce((pre, cur) => {
            if (cur.children) {
              cur.children.map(subItem => {
                pre.push(subItem.name)
              })
              return pre
            } else {
              pre.push('')
              return pre
            }
          }, [])
          const filterVal = _.flatten(this.tableHeader1.map(item => {
            if (item.children) {
              return item.children.map(subItem => {
                return subItem.key
              })
            } else {
              return item.key
            }
          }))
          debugger
          const list = this.list
          const data = this.formatJson(filterVal, list)
          const merges = ['A1:A2', 'B1:B2', 'C1:C2', 'D1:D2', 'E1:E2', 'F1:G1', 'H1:I1', 'J1:J2', 'K1:K2']
          excel.export_json_to_excel({
            multiHeader,
            header,
            merges,
            data,
            filename: 'excel导出'
          })
        } else {
          const tHeader = this.tableHeader.map(item => {
            return item.name
          })
          const filterVal = this.tableHeader.map(item => {
            return item.key
          })
          const list = this.list
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'excel导出'
          })
        }
        this.downloadExcelLoading1 = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}
</script>
