<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button :loading="downloadWordLoading1" type="primary" @click="exportWord">导出word</el-button>
      </el-form-item>
    </el-form>
    <h6 class="work">技术方案：XDOC文档模板云服务</h6>
    <p class="result-success">结果：完美实现，需要做word模板，需要服务端配合</p>
    <p>文档地址：<a href="https://xdts.xdocin.com/" target="__blank">https://xdts.xdocin.com/</a></p>
  </div>
</template>
<script>
export default {
  name: 'Word2',
  data() {
    return {
      downloadWordLoading1: false
    }
  },
  methods: {
    // 点击导出word
    exportWord: function() {
      this.downloadWordLoading1 = true
      // eslint-disable-next-line
      XDts.server = 'https://xdts.xdocin.com/'
      // eslint-disable-next-line
      XDts.run('https://xdts.xdocin.com/demo/report.docx',
        {
          '公司名称': '北京小米科技有限责任公司',
          '外文名称': 'MI',
          '总部地点': '北京市海淀区清河中街68号',
          '成立时间': '2010',
          '徽标': 'http://www.xdocin.com/demo/xiaomi.gif',
          '公司口号': '探索黑科技，小米为发烧而生',
          '年营业额': '780',
          '员工数': '14000',
          'CEO': '雷军',
          '产品': [
            {
              '品牌': '小米MIX2',
              '价格': '3212',
              '销量': '19181',
              '屏幕': '大屏5.99英寸'
            },
            {
              '品牌': '小米6',
              '价格': '2340',
              '销量': '21631',
              '屏幕': '中屏5.15英寸'
            },
            {
              '品牌': '红米5A',
              '价格': '590',
              '销量': '43222',
              '屏幕': '中屏5.0英寸'
            },
            {
              '品牌': '小米MIX2',
              '价格': '3212',
              '销量': '19181',
              '屏幕': '大屏5.99英寸'
            },
            {
              '品牌': '小米6',
              '价格': '2340',
              '销量': '21631',
              '屏幕': '中屏5.15英寸'
            },
            {
              '品牌': '红米5A',
              '价格': '590',
              '销量': '43222',
              '屏幕': '中屏5.0英寸'
            },
            {
              '品牌': '小米MIX2',
              '价格': '3212',
              '销量': '19181',
              '屏幕': '大屏5.99英寸'
            },
            {
              '品牌': '小米6',
              '价格': '2340',
              '销量': '21631',
              '屏幕': '中屏5.15英寸'
            },
            {
              '品牌': '红米5A',
              '价格': '590',
              '销量': '43222',
              '屏幕': '中屏5.0英寸'
            },
            {
              '品牌': '红米5A',
              '价格': '590',
              '销量': '43222',
              '屏幕': '中屏5.0英寸'
            },
            {
              '品牌': '小米MIX2',
              '价格': '3212',
              '销量': '19181',
              '屏幕': '大屏5.99英寸'
            },
            {
              '品牌': '小米6',
              '价格': '2340',
              '销量': '21631',
              '屏幕': '中屏5.15英寸'
            },
            {
              '品牌': '红米5A',
              '价格': '590',
              '销量': '43222',
              '屏幕': '中屏5.0英寸'
            }
          ]
        },
        {
          'format': 'docx'
        },
        '_blank')
      this.downloadWordLoading1 = false
    }
  }
}
</script>
<style lang="scss">

</style>
