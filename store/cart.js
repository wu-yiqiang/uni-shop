export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  }),

  // 模块的 mutations 方法
  mutations: {
		addToCart(state,goods) {
			const findResult = state.cart.find( (item) => {
				item.goods_id == goods.goods_id
			})
			
			if(!findResult){
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			
			this.commit('m_cart/saveToStorage')
		},
		
		// 将购物车中的数据持久化到本地
		saveToStorage(state) {
		   uni.setStorageSync('cart', JSON.stringify(state.cart))
		}
	},

  // 模块的 getters 属性
  getters: {
		total(state) {
			let c = 0
			state.cart.forEach((item) => {
				c+=item.goods_count
			})
			return c
		} 
	},
}