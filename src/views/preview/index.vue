<template>
  <div class="app-container">
    <h2>在线预览方案</h2>
    <p class="work"> 方案1（免费）：微软的office web apps方案，参考文档https://www.cnblogs.com/yanweidie/p/4516164.html</p>
    <p class="work">方案2（免费）：java实现，借助openOffice实现word、excel在线预览及在线编辑，github例子：https://github.com/YiJiuSmile/kkFileViewOfficeEdit、https://github.com/sky8650/TbsForOffice、https://github.com/Casy/filePreview-</p>
    <p class="work">方案3（免费）：前端借助https://view.officeapps.live.com/实现excel、word在线预览，可查看<router-link to="/preview2"><el-link>preview2</el-link></router-link>, 经过试验，已不可用</p>
    <p class="work">方案4（免费）：前端xlsx实现excel在线预览，可查看<router-link to="/preview3"><el-link href="/preview3">preview3</el-link></router-link></p>
    <p class="work">方案5（收费）：idocview</p>
    <p class="work">方案6（收费）：永中DCS：https://www.yozodcs.com/page/preview.html</p>
    <p class="work">方案7（收费）：officeweb365</p>
    <p class="work">方案8（收费）：金山wps预览：https://wwo.wps.cn/docs/</p>
  </div>
</template>
<script>
export default {
  name: 'Word1',
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>
<style lang="scss">

</style>
