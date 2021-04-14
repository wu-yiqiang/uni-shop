<template>
	<view >
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		  <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
		    <image :src="item.pics_big"></image>
		  </swiper-item>
		</swiper>
		<!-- /轮播图区域 -->
	</view>
</template>

<script>
	export default {
		onLoad(option){
			this.id = Number(option.id)
			// 获取详情页面数据
			this.getGoodsDetails()
		},
		data() {
			return {
				// 商品id
				id: 0,
				// 商品详细信息
				goods_info:{}
			};
		},
		
		methods: {
			// 获取商品详细信息 
			async getGoodsDetails() {
				const { data : res } = await uni.$http.get(`/api/public/v1/goods/detail?goods_id=${this.id}`)
				
				if(res.meta.status != 200) return uni.$showMsg("商品详情获取失败！")
				
				this.goods_info = res.message
			}
		}
	}
</script>

<style lang="scss">
swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}
</style>
