<!-- 购物车商品列表的标题区域 -->
<template>
	<view class="cart-title">
	  <!-- 左侧的图标 -->
	  <uni-icons type="shop" size="18"></uni-icons>
	  <!-- 描述文本 -->
	  <text class="cart-title-text">购物车</text>
		
		<!-- 商品列表区域 -->
		<block v-for="(goods, i) in cart" :key="i">
		  <my-goods :goods="goods"></my-goods>
		</block>
		<!-- /商品列表区域 -->
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		mixins: [badgeMix],
		computed: {
			...mapState['m_cart',['cart']]
		},
		onShow() {
			this.setBadge()
		},
		methods: {
		  setBadge() {
				// 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
				uni.setTabBarBadge({
					 index: 2, // 索引
					 text: this.total + '' // 注意：text 的值必须是字符串，不能是数字
				})
		  }
		}
	}
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
</style>
