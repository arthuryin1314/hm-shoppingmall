<template>
  <div class="first-page">
    <header class="hero-header">
      <div class="brand">
        <span class="brand-mark">慧</span>
        <div class="brand-text">
          <p class="brand-title">智慧商城</p>
          <p class="brand-subtitle">新鲜 | 优选 | 快达</p>
        </div>
      </div>
      <div class="search-bar">
        <i class="el-icon-search"></i>
        <el-input
          v-model="input"
          placeholder="搜索尖货、品牌或类目"
          clearable
          @focus="goToSearchPage"
        ></el-input>
      </div>
    </header>

    <section class="section section-carousel">
      <el-carousel
        height="180px"
        indicator-position="outside"
        interval="4200"
        arrow="never"
      >
        <el-carousel-item v-for="(banner, index) in banners" :key="index">
          <img :src="banner.imgUrl" alt="商城主视觉" />
        </el-carousel-item>
      </el-carousel>
    </section>

    <section class="section shortcuts">
      <div class="shortcut-card" v-for="item in shortcuts" :key="item.label">
        <div class="shortcut-icon">
          <img :src="item.imgUrl" alt="">
        </div>
        <p class="shortcut-label">{{ item.text }}</p>
      </div>
    </section>

    <section class="section promo">
      <div class="promo-card">
        <div class="promo-meta">
          <p class="promo-kicker">限时福利</p>
          <p class="promo-title">主会场 · 必抢好物</p>
          <p class="promo-desc">百款新品 6 折封顶，品质精选</p>
          <button class="promo-cta">立即抢购</button>
        </div>
        <img :src="mainImage" alt="主会场" class="promo-image" />
      </div>
    </section>

    <section class="section guess">
      <div class="section-head">
        <p class="title">猜你喜欢</p>
        <p class="subtitle">实时热销榜</p>
      </div>
      <div class="goods-list">
        <GoodsItem :goodsList="goodsList"></GoodsItem>
      </div>
    </section>
  </div>
</template>

<script>
import { Input, Carousel, CarouselItem } from 'element-ui'
import GoodsItem from '@/components/GoodsItem.vue'
import mainImage from '@/assets/main.png'
import { getPageData } from '@/api/firstPage'

export default {
  name: 'FirstPage',
  data () {
    return {
      input: '',
      banners: [],
      mainImage,
      shortcuts: [],
      goodsList: []
    }
  },
  components: {
    ElInput: Input,
    ElCarousel: Carousel,
    ElCarouselItem: CarouselItem,
    GoodsItem
  },
  async created () {
    const res = await getPageData()
    console.log(res)
    this.banners = res.data.pageData.items[1].data
    // console.log(this.banners)
    this.shortcuts = res.data.pageData.items[3].data
    this.goodsList = res.data.pageData.items[6].data
  },
  methods: {
    goToSearchPage () {
      this.$router.push('/searchPage')
    }
  }
}
</script>

<style lang="less" scoped>
.first-page {
  min-height: 100vh;
  padding: 14px 14px 88px;
  background: linear-gradient(180deg, #fdfaf5 0%, #f7f3ec 100%);
  color: #1f2430;
  font-family: 'Manrope', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.hero-header {
  background: #fff;
  border: 1px solid #f0eae3;
  border-radius: 16px;
  padding: 14px;
  box-shadow: 0 10px 28px rgba(205, 178, 147, 0.15);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-mark {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: linear-gradient(135deg, #e85b40 0%, #f89c57 100%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  letter-spacing: 2px;
  box-shadow: 0 10px 18px rgba(232, 91, 64, 0.25);
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand-title {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.4px;
}

.brand-subtitle {
  font-size: 12px;
  color: #6b7285;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f7f4f0;
  border: 1px solid #efe6dc;
}

.search-bar i {
  color: #d65a40;
  font-size: 18px;
}

.section {
  margin-top: 16px;
}

.section-carousel {
  :deep(.el-carousel__container) {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 12px 26px rgba(232, 91, 64, 0.16);
  }

  :deep(.el-carousel__indicators--outside) {
    margin-top: 8px;
  }

  :deep(.el-carousel__indicator button) {
    background: #f4d7c2;
  }

  :deep(.is-active button) {
    background: #e85b40;
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
  }
}

.shortcuts {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.shortcut-card {
  background: linear-gradient(180deg, #fffaf4 0%, #fff7ef 100%);
  border: 1px solid #f2e5d8;
  border-radius: 14px;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  box-shadow: 0 8px 18px rgba(225, 193, 156, 0.18);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.shortcut-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 22px rgba(225, 193, 156, 0.28);
}

.shortcut-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(232, 91, 64, 0.12), rgba(248, 156, 87, 0.12));
  display: grid;
  place-items: center;
  color: #e85b40;
  font-size: 20px;
  overflow: hidden;
}

.shortcut-icon img {
  width: 78%;
  height: 78%;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.06));
}

.shortcut-label {
  font-size: 13px;
  color: #454c5d;
  text-align: center;
}

.promo-card {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 10px;
  padding: 16px;
  background: radial-gradient(circle at 20% 20%, #ffe3cc, #ffd1ba 45%, #ffc8b4 90%);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 16px 30px rgba(232, 91, 64, 0.18);
}

.promo-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #4a2f2a;
}

.promo-kicker {
  font-size: 12px;
  letter-spacing: 1px;
  color: #9a4d39;
  text-transform: uppercase;
}

.promo-title {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.6px;
}

.promo-desc {
  font-size: 13px;
  color: #6e5245;
}

.promo-cta {
  width: 110px;
  margin-top: 6px;
  padding: 9px 0;
  border: none;
  border-radius: 999px;
  background: #e85b40;
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.4px;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(232, 91, 64, 0.32);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.promo-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(232, 91, 64, 0.38);
}

.promo-image {
  width: 100%;
  max-height: 160px;
  object-fit: contain;
  filter: drop-shadow(0 12px 18px rgba(124, 63, 40, 0.22));
}

.guess {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #f0eae3;
  box-shadow: 0 12px 26px rgba(205, 178, 147, 0.14);
  padding: 14px;
}

.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
}

.section-head .title {
  font-size: 18px;
  font-weight: 700;
}

.section-head .subtitle {
  font-size: 12px;
  color: #9b9fab;
}

.goods-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-bar :deep(.el-input__inner) {
  border: none;
  background: transparent;
  padding-left: 0;
  font-size: 14px;
  color: #1f2430;
}

.search-bar :deep(.el-input__inner::placeholder) {
  color: #9b9fab;
}

.search-bar :deep(.el-input__inner:focus) {
  box-shadow: none;
}
</style>
