<template>
  <view>
    <view class="goods-list">
      <view  v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)"> 
        <view class="goods-item">
          <!-- 商品左侧图片区域 -->
          <view class="goods-item-left">
            <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
          </view>
          <!-- 商品右侧信息区域 -->
          <view class="goods-item-right">
            <!-- 商品标题 -->
            <view class="goods-name">{{goods.goods_name}}</view>
            <view class="goods-info-box">
              <!-- 商品价格 -->
              <view class="goods-price">￥{{goods.goods_price}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfo: {
					query:'',
					cid: '',
					pagenum: 1,
					pagesize: 20
				},
				// 商品列表
				goodsList:[],
				// 数据总条数
				total: 0,
				// 节流阀
				loading: false
			}
		},
				
		methods: {
			// 获取商品列表
			async getGoodsLists() {
				this.loading = true
				const { data : res } = await uni.$http.get("/api/public/v1/goods/search", this.goodsInfo)
				if(res.meta.status != 200) return uni.$showMsg("请求商品列表数据失败！")
				this.goodsList.push(...res.message.goods)
				this.total = res.message.total
				this.loading = false
			},
			
			// 跳转到详情页面
			gotoDetail(item) {
				uni.navigateTo({
					url:`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`
				})
			}
		},
		
		onLoad(options) {
			console.log(options)
			this.goodsInfo.cid = options.cid
			this.getGoodsLists()
		},
		// 下拉刷新
		onPullDownRefresh() {
			// 在上拉加载中使用节流方法
			if (this.isloading) return
			this.goodsInfo.pagenum = 1
			this.getGoodsLists()
		},
		
		// 上拉加载
		onReachBottom() {
			if (this.isloading) return
			if (this.goodsInfo.pagenum * this.goodsInfo.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
			this.goodsInfo.pagenum++
			this.getGoodsLists()
		}
	}
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-right: 5px;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }

    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>
