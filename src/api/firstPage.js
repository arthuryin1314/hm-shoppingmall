import request from '@/utils/request'

export const getPageData = () => {
  return request.get('http://smart-shop.itheima.net/index.php?s=/api/page/detail', {
    params: {
      pageId: 0
    }
  })
}
