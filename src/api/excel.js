import request from '@/utils/request'

export function exportExcelApi() {
  return request({
    url: '/export/excel',
    method: 'get'
  })
}
