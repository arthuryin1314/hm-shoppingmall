<template>
  <div class="search">
    <!-- 页面头部 -->
    <el-page-header content="商品搜索" @back="$router.back()" />

    <!-- 搜索框区域 -->
    <div class="search-input-wrapper">
      <input
        type="text"
        placeholder="请输入搜索的商品"
        class="search-input"
        v-model="inputItem"
      >
      <button class="searchBtn" @click="goSearch(inputItem)" @keyup.enter="goSearch(inputItem)">搜索</button>
    </div>

    <!-- 最近搜索区域 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <i class="el-icon-delete" style="font-size: 16px;" @click="clear"></i>
      </div>
      <div class="list" v-if="history.length>0">
        <div class="list-item"  v-for="(item,index) in history" :key="index" @click="goSearch(item)">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { PageHeader } from 'element-ui'
import { getHistory, setHistory } from '@/utils/storage'
export default {
  components: {
    ElPageHeader: PageHeader
  },
  data () {
    return {
      history: getHistory(),
      inputItem: '',
      item: ''
    }
  },
  methods: {
    goSearch (key) {
      this.history.unshift(key)
      // this.$router.push('/searchList')
      setHistory(this.history)
      this.$router.push(`/searchList?key=${key}`)
    },
    clear () {
      this.history = []
      setHistory([])
    }
  }
}
</script>

<style lang="less" scoped>
// 全局容器样式
.search {
  // 重置 Element UI 页面头部样式
  ::v-deep .el-page-header {
    padding: 0 15px;
    margin: 0;
    .el-page-header__left {
      .el-page-header__back {
        color: #333;
        font-size: 16px;
      }
      .el-page-header__content {
        font-size: 16px;
        font-weight: 500;
      }
    }
  }

  // 搜索框容器样式
  .search-input-wrapper {
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin: 10px 0;

    .search-input {
      flex: 1;
      height: 35px;
      padding: 0 15px;
      border: 1px solid #eee;
      border-radius: 5px 0 0 5px;
      outline: none;
      font-size: 14px;
      &::placeholder {
        color: #999;
      }
    }

    .searchBtn {
      background-color: #fa2209;
      color: #fff;
      border: none;
      height: 37px;
      padding: 0 20px;
      border-radius: 0 5px 5px 0;
      cursor: pointer;
    }
  }

  // 最近搜索标题样式
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }

  // 搜索历史列表样式
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }

  // 搜索历史项样式
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>
