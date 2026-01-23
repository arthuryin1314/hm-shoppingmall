import request from '@/utils/request'

// 加入购物车
export function addCart (data) {
  return request({
    url: '/cart/add',
    method: 'post',
    data
  })
}

// 获取购物车列表（后续购物车页面用）
export function getCartList () {
  return request({
    url: '/cart/list',
    method: 'get'
  })
}
