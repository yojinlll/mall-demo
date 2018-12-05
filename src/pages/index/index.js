import '@/modules/css/common.css'
import './index.scss'

import Vue from 'vue'
import axios from 'axios'
import url from '@/modules/js/api.js'

import {InfiniteScroll} from 'mint-ui'
Vue.use(InfiniteScroll)

import Footer from '../../components/m-footer'
import Swipe from '../../components/m-swipe'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  data: {
    lists: null,
    pageNum: 1,
    pageSize: 6,
    loading: false,     // true 加载
    allLoaded: false,
    bannerLists: null
  },
  components: {
    'm-footer': Footer,
    'm-swipe': Swipe
  },
  created(){
    console.log(1111)
    this.getLists()
    this.getBanner()
  },
  methods: {
    getLists(){
      if(this.allLoaded) return
      this.loading = true   //函数节流

      axios.get(url.hotLists, {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then((res) => {
        let curLists = res.data.lists
        // 判断数据是否加载完毕
        if(curLists.length < this.pageSize){
          this.allLoaded = true
        }
        // 衔接 lists 数组
        if(this.lists){
          this.lists = this.lists.concat(curLists)
        }else{
          this.lists = curLists
        }

        this.loading = false
        this.pageNum++
      })
    },
    getBanner(){
      axios.get(url.banner).then((res)=>{
        this.bannerLists = res.data.lists
        console.log(this.bannerLists)
      })
    }
  }
})
