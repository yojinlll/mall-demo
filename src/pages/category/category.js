import '@/modules/css/common.css'
import './category.scss'

import Vue from 'vue'
import axios from 'axios'
import url from '@/modules/js/api.js'

import Footer from '../../components/m-footer'
import mixin from '@/modules/js/mixin.js'


new Vue({
  el: '#app',
  // components: {
  //   'm-footer': Footer
  // },
  data: {
    topLists: null,
    topIndex: 0,

    hotGoods: null,
    hotKeywords: null,
    hotShops: null,

    brandList: null,
    categoryList: null,

  },
  methods: {
    getTopLists(){
      axios.get(url.topList).then((res) => {
        this.topLists = res.data.lists
      })
    },
    getSubList(id, index){
      this.topIndex = index
      if (index === 0) {
        console.log(111111)
        this.getRank()
      }else {
        axios.get(url.subList, {
          params: {
            id
          }
        }).then((res) => {
          this.brandList = res.data.data.brandList
          this.categoryList = res.data.data.categoryList
        })
      }
    },
    getRank(){
      axios.get(url.rank).then((res) => {
        this.hotGoods = res.data.data.hotGoods;
        this.hotKeywords = res.data.data.hotKeywords;
        this.hotShops = res.data.data.hotShops;
      })
    },
    toSearch(list){
      console.log(list)
      location.href = `search.html?keyword=${list.name}&id=${list.id}`
    }
  },
  created(){
    this.getTopLists()
    this.getSubList(0,0)
  },

  mixins: [mixin]
})
