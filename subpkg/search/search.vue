0
<template>
	<view class="search-box">
	  <!-- 使用 uni-ui 提供的搜索组件 -->
	  <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="kw">
		  <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
		    <view class="goods-name">{{item.goods_name}}</view>
		    <uni-icons type="arrowright" size="16"></uni-icons>
		  </view>
		</view>
		<!-- /搜索建议列表 -->
		
		<!-- 历史搜索记录 -->
		<view class="history-box" v-else>
		  <!-- 标题区域 -->
		  <view class="history-title">
		    <text>搜索历史</text>
		    <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
		  </view>
		  <!-- 列表区域 -->
		  <view class="history-list">
		    <uni-tag :text="item" v-for="(item, i) in historyList" :key="i" @click="addHistoryToInput(item)"></uni-tag>
		  </view>
		</view>
		<!-- 历史搜索记录 -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器的 timerId
				timer: 0,
				// 搜索关键词
				kw: '',
				// 更具查询的关键词返回的搜索结果
				searchResults: [],
				// 搜搜历史关键词
				historyList: []
			};
		},
		
		methods:{
			input(e) {
			  // 清除 timer 对应的延时器
			  clearTimeout(this.timer)
			  // 重新启动一个延时器，并把 timerId 赋值给 this.timer
			  this.timer = setTimeout(() => {
			    // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
			    this.kw = e
			    if(this.kw) {
						this.getSearchList()
						// 历史记录去重
						this.historyList.unshift(this.kw)
						this.historyList =[...new Set(this.historyList)] 
					} 
			  }, 500)
			},
			
			// 获取搜索建议
			async getSearchList(){
				if(this.kw) {
					const { data : res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
					if (res.meta.status !== 200) return uni.$showMsg()
					this.searchResults = res.message
				}
			},
			
			// 选择搜索建议，跳转到详情页面
			gotoDetail(id) {
				uni.navigateTo({
					url:`/subpkg/goods_detail/goods_detail?id=${id}`,
				})
				
			},
		
			// 清除历史记录
			clearHistory () {
				this.historyList = []
				uni.clearStorageSync("historyList");
			},
			
			// 添加历史记录到搜索框
			addHistoryToInput(item) {
				this.kw = item
			},
			
			// 缓存历史记录
			saveInputHistory() {
				uni.setStorageSync('historyList', this.historyList)
			},
			
			// 获取本地历史记录缓存
			getLocalHistoryCache() {
				this.historyList = uni.getStorageSync('historyList')
			}
		},
		onLoad() {
			this.getLocalHistoryCache()
		},
		beforeDestroy() {
			this.saveInputHistory()
		}
	}
</script>

<style lang="scss">
.uni-searchbar {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  position: relative;
  padding: 16rpx;
  /* 将默认的 #FFFFFF 改为 #C00000 */
  background-color: #c00000;
}

.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
	.sugg-list {
	  padding: 0 5px;
	
	  .sugg-item {
	    font-size: 12px;
	    padding: 13px 0;
	    border-bottom: 1px solid #efefef;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	
	    .goods-name {
	      // 文字不允许换行（单行文本）
	      white-space: nowrap;
	      // 溢出部分隐藏
	      overflow: hidden;
	      // 文本溢出后，使用 ... 代替
	      text-overflow: ellipsis;
	      margin-right: 3px;
	    }
	  }
	}
	
	.history-box {
	  padding: 0 5px;
	
	  .history-title {
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    height: 40px;
	    font-size: 13px;
	    border-bottom: 1px solid #efefef;
	  }
	
	.history-list {
	  display: flex;
	   flex-wrap: wrap;
	
	   .uni-tag {
	     margin-top: 5px;
	     margin-right: 5px;
	    }
	  }
	}
}
</style>
