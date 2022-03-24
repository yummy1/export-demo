import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  install(Vue, options) {
    this.downloadPDFLoading2 = false
    Vue.prototype.$getPdf = function() {
      return new Promise((resolve, reject) => {
        var title = '导出PDF'
        html2Canvas(document.querySelector('#pdfDom'), {
          allowTaint: true
        }).then(function(canvas) {
          const contentWidth = canvas.width
          const contentHeight = canvas.height
          const a4Width = 595.28
          const a4Height = 841.89
          // 一页pdf显示html页面生成的canvas高度;
          const pageHeight = contentWidth / a4Width * a4Height
          // 未生成pdf的html页面高度
          let leftHeight = contentHeight
          // 页面偏移
          let position = 0
          // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          const imgWidth = (a4Width - 40)
          const imgHeight = (a4Width - 40) / contentWidth * contentHeight
          const pageData = canvas.toDataURL('image/jpeg', 1.0)
          const PDF = new JsPDF('', 'pt', 'a4')
          // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          // 当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            // 在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
            PDF.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              PDF.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89
              // 避免添加空白页
              if (leftHeight > 0) {
                PDF.addPage()
              }
            }
          }
          PDF.save(title + '.pdf')
          resolve()
        })
      })
    }
  }
}
