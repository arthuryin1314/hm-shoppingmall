<template>
  <div class="layout-header">
    <!-- 给el-menu套一层容器，方便控制整体布局 -->
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/divideClass">分类</el-menu-item>
      <el-menu-item index="/cartIndex">购物车</el-menu-item>
      <el-menu-item index="/myInfo">我的</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
/* 容器铺满页面宽度 */
.layout-header {
  width: 100%;
  position: fixed; /* 固定定位 */
  bottom: 0;       /* 贴紧底部 */
  left: 0;         /* 贴紧左侧 */
  z-index: 999;    /* 防止被其他内容遮挡 */
}

/* 让el-menu铺满容器，选项均匀分布 */
.el-menu-demo {
  width: 100%;
  display: flex; /* 用flex布局均匀分布选项 */
  justify-content: space-around; /* 选项均匀分散在导航栏 */
  height: 60px; /* 增加导航栏高度，更美观 */
  line-height: 60px; /* 文字垂直居中 */
}

/* 可选：给菜单项加内边距，避免太挤 */
.el-menu-item {
  padding: 0 20px;
}
</style>
