<template>
  <div class="goods-list">
    <div
      class="goods-card"
      v-for="item in renderList"
      :key="item.goods_id || item.goods_list || item.id"
      @click="handleClick(item)"
    >
      <div class="thumb">
        <img :src="item.goods_image" alt="商品图片" />
      </div>
      <div class="meta">
        <p class="title text-ellipsis-2">{{ item.goods_name }}</p>
        <p class="count">已售{{ item.sold_count || 104 }}件</p>
        <p class="price">
          <span class="new">¥{{ formatPrice(item.line_price_max) }}</span>
          <span v-if="item.line_price_min" class="old">¥{{ formatPrice(item.line_price_min) }}</span>
        </p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    goodsList: {
      type: Array,
      default: () => []
    },
    item: {
      type: Object,
      default: null
    }
  },
  computed: {
    renderList () {
      if (this.goodsList && this.goodsList.length) return this.goodsList
      if (this.item) return [this.item]
      return [
        {
          id: 'placeholder',
          goods_name: '人气好物 优选品质 新鲜到家',
          goods_image: require('@/assets/product.jpg'),
          line_price_max: 3999,
          line_price_min: 6699,
          sold_count: 104
        }
      ]
    }
  },
  methods: {
    formatPrice (val) {
      if (val === undefined || val === null) return ''
      const num = typeof val === 'number' ? val : parseFloat(String(val).replace(/[^\d.]/g, ''))
      if (Number.isNaN(num)) return String(val)
      return num.toFixed(2)
    },
    handleClick (item) {
      this.$emit('click', item)
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.goods-card {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #f0eae3;
  box-shadow: 0 8px 18px rgba(205, 178, 147, 0.14);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.goods-card:active,
.goods-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 22px rgba(205, 178, 147, 0.2);
}

.thumb {
  width: 120px;
  min-width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  background: #f6f6f6;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px 0;
}

.title {
  font-size: 14px;
  line-height: 1.4;
  color: #1f2430;
}

.count {
  color: #9b9fab;
  font-size: 12px;
}

.price {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.price .new {
  color: #e85b40;
  font-size: 16px;
  font-weight: 700;
}

.price .old {
  color: #9b9fab;
  text-decoration: line-through;
  font-size: 12px;
}
</style>
