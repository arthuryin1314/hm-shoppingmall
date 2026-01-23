const key = 'hm_shpping_key'
const historyKey = 'hm_shopping_history_key'
export const getItem = () => {
  const defaultObj = {
    token: '',
    userId: ''
  }
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : defaultObj
}

export const setItem = (obj) => {
  localStorage.setItem(key, JSON.stringify(obj))
}
export const setHistory = (arr) => {
  localStorage.setItem(historyKey, JSON.stringify(arr))
}
export const getHistory = () => {
  const result = localStorage.getItem(historyKey)
  return result ? JSON.parse(result) : []
}
