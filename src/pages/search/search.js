import '@/modules/css/common.css'
import './search.scss'

import Vue from 'vue'
import axios from 'axios'
import url from '@/modules/js/api.js'

import {InfiniteScroll} from 'mint-ui'
Vue.use(InfiniteScroll)

import Velocity from 'velocity-animate'
import mixin from '@/modules/js/mixin.js'

new Vue({
  el: '#app',
  data: {
    searchLists: null,
    loading: false,
    parameter: null,
    isShow: false
  },
  created(){
    this.getSearchList()
    window.onscroll = this.move
  },
  methods: {
    getSearchList(){
      this.splitUrl()
      this.loading = true

      axios.get(url.searchList,{
        params:{
          id: this.parameter
        }
      }).then((res)=>{
        let currentLists = res.data.lists
        if(this.searchLists){
          this.searchLists = this.searchLists.concat(currentLists)
        }else{
          this.searchLists = currentLists
        }
        this.loading = false
      })
    },
    splitUrl(){               // 将 url 参数中的 keyword 和 id 转换为对象
      let arr = decodeURIComponent(location.search.substr(1)).split('&')
      let obj = {}
      arr.forEach((item)=>{
        let part = item.split('=')
        obj[`${part[0]}`] = `${part[1]}`
      })
      this.parameter = obj
    },
    move(){
      if(document.documentElement.scrollTop > 100){
        this.isShow = true
      }else{
        this.isShow = false
      }
    },
    goTop(){
      Velocity(document.body,'scroll',{duration: 500})
      // document.documentElement.scrollTop = 0
    }
  },
  mixins: [mixin]
})
