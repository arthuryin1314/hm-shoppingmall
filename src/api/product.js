import request from '@/utils/request'

export const getProductData = (obj) => {
  const { sortType, page, sortPrice, categoryId, goodsName } = obj
  return request.get('http://smart-shop.itheima.net/index.php?s=/api/goods/list', {
    params: {
      sortType,
      page,
      sortPrice,
      categoryId,
      goodsName
    }
  })
}
