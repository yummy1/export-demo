
module.exports = [
  {
    url: '/export/excel',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: 'http://101.43.196.129/excel.xlsx'
      }
    }
  }
]
