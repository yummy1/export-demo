<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button :loading="downloadWordLoading1" type="primary" @click="exportWord">导出word</el-button>
      </el-form-item>
    </el-form>
    <p class="work">技术方案：docxtemplater + jszip-utils + jszip + file-saver</p>
    <p class="result-success">结果：完美实现，需要做word模板</p>
    <!-- 报价容器 -->
    <div class="quoteContainer">
      <!-- 报价顶部信息 -->
      <div class="quote_info clearfix">
        <h3 class="h3_title">病例查询</h3>
        <div class="quote_itemBox">
          <div class="quote_item">
            <span class="quote_label">客户名称：</span>
            <p class="quote_p">{{ form.custName }}</p>
          </div>
          <div class="quote_item">
            <span class="quote_label">联系方式：</span>
            <p class="quote_p">{{ form.phoneNumber }}</p>
          </div>
        </div>
        <div class="quote_itemBox">
          <div class="quote_item">
            <span class="quote_label">备注：</span>
            <p class="quote_p">{{ form.remark }}</p>
          </div>
        </div>
      </div>
      <!-- 设备选取表格 -->
      <div class="quote_table clearfix">
        <el-table
          ref="tableDomQuote"
          border
          class="table_domQuote"
          size="small"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column prop="number" width="80" label="序号" align="center" />
          <el-table-column label="年" prop="year" align="center" />
          <el-table-column label="月" prop="month" align="center" />
          <el-table-column label="流水号" prop="admission_no" align="center" />
          <el-table-column label="患者姓名" prop="patient_name" align="center" />
          <el-table-column label="科室" prop="dept_name" align="center" />
          <el-table-column label="结算日期" prop="billdate" align="center" />
          <el-table-column label="总费用" prop="total_amount" align="center" />
          <div slot="append">
            <div class="quoteTable">
              <span class="quoteTable_sp1">合计：</span>
              <span class="quoteTable_sp1">{{ form.totalPrice }}</span>
            </div>
          </div>
        </el-table>
      </div>
    </div>
    <!-- 审核备注容器 -->
    <div class="reasonBox clearfix">
      <div class="title_checkReason">审核备注：</div>
      <div class="checkReasonMain">
        <div class="p_box">
          <p class="p_checkReason">{{ form.checkReason }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import JSZipUtils from 'jszip-utils'
import JSZip from 'jszip'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'
export default {
  name: 'Word1',
  data() {
    return {
      // 表单对象
      form: {
        custName: '历山医院', // 客户姓名
        phoneNumber: '138xxxxxxxx', // 联系方式
        totalPrice: 1940, // 合计报价
        remark: 'QEWARAEQAAAAAAAAA', // 备注
        checkReason: '同意' // 审核备注
      },
      // 表格信息
      tableData: [],
      downloadWordLoading1: false
    }
  },
  created() {
    this.tableData = [
      {
        number: 1, // 序号
        year: '2022', // 年
        month: 1, // 月
        admission_no: '52671221', // 流水号
        patient_name: '李丽', // 患者姓名
        dept_name: '消化科', // 科室
        billdate: '2022-02-11', // 结算日期
        total_amount: 120
      },
      {
        number: 2, // 序号
        year: '2022', // 年
        month: 2, // 月
        admission_no: '52671221', // 流水号
        patient_name: '王伟', // 患者姓名
        dept_name: '内分泌科', // 科室
        billdate: '2022-03-11', // 结算日期
        total_amount: 900
      },
      {
        number: 3, // 序号
        year: '2022', // 年
        month: 3, // 月
        admission_no: '52671221', // 流水号
        patient_name: '牛客', // 患者姓名
        dept_name: '神经外科', // 科室
        billdate: '2022-03-11', // 结算日期
        total_amount: 920
      }
    ]
  },
  methods: {
    // 点击导出word
    exportWord: function() {
      this.downloadWordLoading1 = true
      const _this = this
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent('export-word.docx', function(error, content) {
        // input.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
        // 抛出异常
        if (error) {
          throw error
        }

        // 创建一个JSZip实例，内容为模板的内容
        const zip = new JSZip(content)
        // 创建并加载docxtemplater实例对象
        const doc = new Docxtemplater().loadZip(zip)
        // 设置模板变量的值
        doc.setData({
          ..._this.form,
          table: _this.tableData
        })

        try {
          // 用模板变量的值替换所有模板变量
          doc.render()
        } catch (error) {
          // 抛出异常
          const e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          }
          console.log(JSON.stringify({ error: e }))
          throw error
        }

        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        })
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, '导出word.docx')
        _this.downloadWordLoading1 = false
      })
    }
  }
}
</script>
<style lang="scss">
* {
	margin: 0;
	padding: 0;
	font-size: 12px;
	font-family: "微软雅黑", "宋体";
	list-style: none;
	box-sizing: border-box;
}
// 清除浮动
.clearfix:after {
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  clear: both;
  visibility: hidden;
}

.clearfix {
  zoom: 1;
}
.quoteContainer {
  .quote_info {
    width: 800px;
    margin: 0 auto;
    .h3_title {
      float: left;
      width: 100%;
      font-size: 20px;
      line-height: 40px;
      text-align: center;
      margin-bottom: 30px;
    }
    .quote_itemBox {
      float: left;
      width: 100%;
      margin-bottom: 20px;
      .quote_item {
        float: left;
        width: 50%;
        display: flex;
        .quote_label {
          width: 100px;
          text-align: right;
          line-height: 32px;
        }
        .quote_p {
          flex: 1;
          line-height: 32px;
        }
      }
    }
  }
  .quote_table {
    padding: 0 20px;
    .table_domQuote {
      .quoteTable {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 14px;
        padding-right: 30px;
        height: 50px;
      }
    }
  }
}
.reasonBox {
  padding: 0 20px 20px 20px;
  .title_checkReason {
    line-height: 50px;
  }
  .checkReasonMain {
    .p_box {
      border: 1px solid #ebeef5;
      padding: 10px 20px;
      .p_checkReason {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
// 底部按钮
.botmBtnContainer {
  text-align: center;
  padding: 20px;
}
</style>
