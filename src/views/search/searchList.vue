<template>
  <div class="search-page">
    <div class="header-card">
      <el-page-header content="商品列表" class="page-header" @back="$router.back()" />

      <div class="search-row">
        <i class="el-icon-search icon muted"></i>
        <input class="search-input" type="text" :value="key" placeholder="搜索商品" />
        <i class="el-icon-menu icon"></i>
      </div>

      <el-tabs v-model="activeName" class="filter-tabs" @tab-click="handleClick">
        <el-tab-pane label="综合" name="first">综合</el-tab-pane>
        <el-tab-pane label="销量" name="second">销量</el-tab-pane>
        <el-tab-pane label="价格" name="third">价格</el-tab-pane>
      </el-tabs>
    </div>

    <div class="list-wrapper">
      <GoodsItem :goodsList="goodsList" />
    </div>
  </div>
</template>

<script>
import { PageHeader, Tabs, TabPane } from 'element-ui'
import { getProductData } from '@/api/product'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  components: {
    ElPageHeader: PageHeader,
    ElTabs: Tabs,
    ElTabPane: TabPane,
    GoodsItem
  },
  data () {
    return {
      key: this.getQuery(),
      goodsList: [],
      activeName: 'first'
    }
  },
  methods: {
    getQuery () {
      return this.$route.query.key
    },
    handleClick () {
      // tabs reserved for future filters
    }
  },
  async created () {
    const res = await getProductData({ sortType: 'all', page: 0, sortPrice: 0, categoryId: this.key, goodsName: this.key })
    console.log(res)
    this.goodsList = res.data.list.data
  }
}
</script>

<style lang="less" scoped>
.search-page {
  min-height: 100vh;
  padding: 10px 12px 24px;
  background: linear-gradient(180deg, #f7f8fb 0%, #f2f3f7 40%, #eef1f6 100%);
}

.header-card {
  background: #fff;
  border-radius: 14px;
  padding: 12px;
  box-shadow: 0 10px 24px rgba(31, 36, 48, 0.06);
  border: 1px solid #eef1f6;
  position: sticky;
  top: 0;
  z-index: 10;
}

.page-header {
  padding: 4px 0 10px;
}

.search-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #f7f8fb;
  border-radius: 12px;
  border: 1px solid #eceef3;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #1f2430;
  outline: none;
}

.icon {
  font-size: 18px;
  color: #1f2430;
}

.icon.muted {
  color: #9b9fab;
}

.filter-tabs {
  margin-top: 8px;
}

::v-deep .filter-tabs .el-tabs__header {
  margin: 0;
  border-bottom: 0;
}

::v-deep .filter-tabs .el-tabs__nav-wrap::after {
  height: 0;
}

::v-deep .filter-tabs .el-tabs__item {
  padding: 10px 12px;
  color: #5a5f6a;
  font-size: 14px;
}

::v-deep .filter-tabs .el-tabs__item.is-active {
  color: #e85b40;
  font-weight: 700;
}

::v-deep .filter-tabs .el-tabs__active-bar {
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #ff9e6f 0%, #ff6f61 100%);
}

.list-wrapper {
  margin-top: 12px;
}
</style>
