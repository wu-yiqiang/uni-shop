<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
          <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
            <!-- 动态绑定图片的 src 属性 -->
            <image :src="item.image_src"></image>
          </navigator>
      </swiper-item>
    </swiper>
		<!-- /轮播图区域 -->
		
		
		<!-- 分类导航区域 -->
		<view class="nav-list">
		   <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
		     <image :src="item.image_src" class="nav-img"></image>
		   </view>
		</view>	
		<!-- /分类导航区域 -->
		
		
		<!-- 楼层区域 -->
		<view class="floor-list">
		  <!-- 楼层 item 项 -->
		  <view class="floor-item" v-for="(item, i) in floorList" :key="i">
		    <!-- 楼层标题 -->
		    <image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- /楼层标题 -->
				<!-- 楼层图片区域 -->
				<navigator class="floor-img-box" :url="item.product_list.url">
					<view class="left-img-box">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</view>
					
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2, index2) in item.product_list" :key="index2" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width+ 'rpx'}" v-if="index2!= 0"></image>
						</navigator>
					</view>
				</navigator>
				<!-- /楼层图片区域 -->
		  </view>
		</view>
		<!-- /楼层区域 -->
  </view>
</template>

<script>
	export default {
	  data() {
	    return {
	      // 1. 轮播图的数据列表，默认为空数组
	      swiperList: [],
				// 分类导航数据
				navList:[],
				// 楼层区域
				floorList:[]
	    }
	  },
	  onLoad() {
	    // 2. 在小程序页面刚加载的时候，调用获取轮播图数据的方法
	    this.getSwiperList()
			this.getnavList()
			this.getFloorList()
	  },
	  methods: {
	    // 3. 获取轮播图数据的方法
	    async getSwiperList() {
	      // 3.1 发起请求
	      const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
	      // 3.2 请求失败
	      if (res.meta.status !== 200) {
	        return uni.$showMsg()
	      }
	      // 3.3 请求成功，为 data 中的数据赋值
	      this.swiperList = res.message
				uni.$showMsg("数据请求成功！")
	    },
			
			// 获取分类导航数据
			async getnavList() {
				const {data:res} = await uni.$http.get("/api/public/v1/home/catitems")
				if(res.meta.status != 200 ) return uni.$showMsg("请求导航列表数据失败！")
				
				this.navList = res.message
				
			},
			
			// 跳转分类的详情页面
			navClickHandler(item) {
				if(item.name === "分类") {
					// 跳转到分类页面
					uni.switchTab({
						url:"page/cate/cate"
					})
				} 
				
				if(item.name === '秒杀拍') {
					// 跳转到秒杀拍页面
				}
				
				if(item.name === "超市购") {
					// 跳转到超市购页面
				}
				
				if(item.name === "母婴品") {
					// 跳转到母婴品页面
				}
				
			},
			
			// 获取楼层数据
			async getFloorList() {
				const {data:res} = await uni.$http.get("/api/public/v1/home/floordata")
				if(res.meta.status != 200 ) return uni.$showMsg("请求楼层列表数据失败！")
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			}
		},
		
	}
</script>

<style lang="scss">
swiper {
 height: 330rpx;

 .swiper-item,
 image {
   width: 100%;
   height: 100%;
 }
}

.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}

.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}

.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}
</style>
