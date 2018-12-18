// import '@/modules/css/common.css'
import './cart.css'
import './cart_base.css'
import './cart_trade.css'

import Vue from 'vue'
import axios from 'axios'
import url from '@/modules/js/api.js'
import mixin from '@/modules/js/mixin.js'
import Volecity from 'velocity-animate'
import Cart from '@/modules/js/cartService.js'
import fetch from '@/modules/js/fetch'

new Vue({
  el: '.container',
  data: {
    lists: null,
    total: 0,
    editingShop: null,
    editingShopIndex: - 1,
    removePopup: false,
    removeData: null,
    removeMsg: '',
  },
  computed: {
    allSelected: {       //当全部店铺被选中，则为全选
      get(){
        if (this.lists && this.lists.length) {
          return this.lists.every((shop) => {
            return shop.checked
          })
        }
        return false
        // 每一个 shop.checked 为 true ，则 allSelected 为 true
      },
      set(newVal){
        this.lists.forEach(shop => {
          shop.checked = newVal
          shop.goodsList.forEach(good => {
            good.checked = newVal
          })
        })
        // 当 allSelected 为 true ，则每一个 shop.checked 和 good.checked 都为 true
      }
    },
    allRemoveSelected: {
      get(){
        if (this.editingShop) {
          return this.editingShop.removeChecked
        }
        return false
        // editingShop 等于编辑时选择的 shop
      },
      set(newVal){
        if (this.editingShop) {
          this.editingShop.removeChecked = newVal
          this.editingShop.goodsList.forEach(good => {
            good.removeChecked = newVal
          })
        }
        // 当 allRemoveSelected 为 true 时，当前商店的所有商品的 removeChecked 为 true
      }
    },
    selectLists(){      // 记录并结算商品总值
      if (this.lists && this.lists.length) {
        let arr = []
        let total = 0
        this.lists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if (good.checked) {
              arr.push(good)
              total += good.price * good.number
            }
          })
        })
        this.total = total
        return arr
      }
      return []
    },
    removeLists(){      // 记录并删除编辑时所选择的商品
      if (this.editingShop) {
        let arr = []
        this.editingShop.goodsList.forEach(good => {
          if (good.removeChecked) {
            arr.push(good)
          }
        })
        return arr
      }
      return []
    }
  },
  created(){
    this.getList()
  },
  methods: {
    getList(){            // 异步获取数据，并添加变量信息
      axios.get(url.cartLists).then((res) => {
        let lists = res.data.cartList
        lists.forEach((shop) => {
          shop.checked = true
          shop.removeChecked = false
          shop.editing = false
          shop.editingMsg = '编辑'
          shop.goodsList.forEach((good) => {
            good.checked = true
            good.removeChecked = false
          })
        })
        this.lists = lists
      })
    },
    selectGood(shop, good){       //选中商品，且全部商品被选中，则店铺也被选中
      let attr = this.editingShop ? 'removeChecked' : 'checked'     // 判断是否为编辑环境
      good[attr] = ! good[attr]
      shop[attr] = shop.goodsList.every((good) => {
        return good[attr]
      })
    },
    selectShop(shop){       //选中店铺，则店铺下的商品都要被选中
      let attr = this.editingShop ? 'removeChecked' : 'checked'     // 判断是否为编辑环境
      shop[attr] = ! shop[attr]
      shop.goodsList.forEach(good => {
        good[attr] = shop[attr]
      })
    },
    selectAll(){
      let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'     // 判断是否为编辑环境
      this[attr] = ! this[attr]
    },
    edit(shop, shopIndex){
      shop.editing = ! shop.editing
      shop.editingMsg = shop.editing ? '完成' : '编辑'
      this.lists.forEach((item, i) => {
        if (shopIndex !== i) {
          item.editing = false
          item.editingMsg = shop.editing ? '' : '编辑'
        }
      })
      this.editingShop = shop.editing ? shop : null
      this.editingShopIndex = shop.editing ? shopIndex : - 1
      // 当一个商店处于编辑时，编辑信息更改，且其他商店的编辑信息为空字符串。此时，将编辑的商店信息传入 editingShop
    },
    reduce(good){
      if (good.number === 1) return
      // axios.post(url.cartReduce, {
      //   id: good.id,
      //   number: 1
      // }).then(res => {
      //   good.number --
      // })
      Cart.reduce(good.id).then(res=>{
        good.number--
      })

    },
    add(good){
      // axios.post(url.cartAdd, {
      //   id: good.id,
      //   number: 1
      // }).then(res => {
      //   good.number ++
      // })
      Cart.add(good.id).then(res=>{
        good.number++
      })
    },
    remove(shop, shopIndex, good, goodIndex){
      this.removePopup = true
      this.removeData = {shop, shopIndex, good, goodIndex}
      this.removeMsg = '确定要删除该商品吗？'
    },
    removeList(){
      this.removePopup = true
      // this.removeData = {shop, shopIndex, good, goodIndex}
      this.removeMsg = `确定要删除这${this.removeLists.length}件商品吗？`
    },
    removeConfirm(){
      if (this.removeMsg === '确定要删除该商品吗？') {
        let {shop, shopIndex, good, goodIndex} = this.removeData
        fetch(url.cartRemove, {
          id: good.id
        }).then(res => {
          shop.goodsList.splice(goodIndex, 1)
          if (! shop.goodsList.length) {
            this.lists.splice(shopIndex, 1)
            this.removeShop()
          }
          this.removePopup = false
        })
        // 删除单商品
      }else {
        let ids = []
        this.removeLists.forEach(good => {
          ids.push(good.id)
        })
        axios.post(url.cartMrremove, {
          ids
        }).then(res => {
          let arr = []

          // 将店铺所有商品与即将删除的商品比较，不需要删除的商品则存到 arr，最后再转移
          this.editingShop.goodsList.forEach(good => {
            let index = this.removeLists.findIndex(item => {
              return item.id === good.id
            })
            if (index === - 1) {
              arr.push(good)
            }
          })
          if (arr.length) {
            this.editingShop.goodsList = arr
          }else {
            this.lists.splice(this.editingShopIndex, 1)
            this.removeShop()
          }
          this.removePopup = false
        })
      }
    },
    removeShop(){
      this.editingShop = null
      this.editingShopIndex = - 1
      this.lists.forEach(shop => {
        shop.editing = false
        shop.editingMsg = '编辑'
      })
    },
    start(e, good){
      good.startX = e.changedTouches[0].clientX
    },
    end(e, shopIndex, good, goodIndex){
      let endX = e.changedTouches[0].clientX
      let left = '0'
      if (good.startX - endX > 100) {
        left = '-60px'
      }else if (endX - good.startX > 50) {
        left = '0px'
      }
      Volecity(this.$refs[`goods-${shopIndex}-${goodIndex}`], {
        left
      })
    }
  },

  mixins: [mixin]
})

