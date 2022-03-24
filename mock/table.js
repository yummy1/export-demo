const Mock = require('mockjs')

const data = Mock.mock({
  'items|20': [{
    year: '2022',
    month: '3',
    admission_no: '23213213',
    medical_record_id: '9932332',
    patient_name: '李丽',
    bmi_code: '32432423',
    bmi_name: '广西壮族自治区南宁市',
    discharge_disease_id: '32423243242',
    discharge_disease_name: '霍乱',
    dept_name: '内分泌科',
    doctor_group_name: '内分泌科(梁瑜祯)组'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
