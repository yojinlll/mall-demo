import '@/modules/css/common.css'
import './category.scss'

import Vue from 'vue'
import axios from 'axios'
import url from '@/modules/js/api.js'

import Footer from '../../components/m-footer'


new Vue({
  el: '#app',
  components: {
    'm-footer': Footer
  },
  data: {
    topLists: null,
    topIndex: 0,
    subData: null,
    rankData: null
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
          this.subData = res.data.data
          console.log(this.subData)
        })
      }
    },
    getRank(){
      axios.get(url.subList).then((res) => {
        this.rankData = res.data.data
        console.log(this.rankData)
      })
    }
  },
  created(){
    this.getTopLists()
    this.getSubList(0,0)
  }


})
