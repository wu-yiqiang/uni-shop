<template>
	<view >
		sad
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
				goodDetails:{}
			};
		},
		
		methods: {
			// 获取商品详细信息 
			async getGoodsDetails() {
				const { data : res } = await uni.$http.get(`/api/public/v1/goods/detail?goods_id=${this.id}`)
				
				if(res.meta.status != 200) return uni.$showMsg("商品详情获取失败！")
				
				this.goodDetails = res.message
			}
		}
	}
</script>

<style lang="scss">

</style>
