import '@/modules/css/common.css'
import './cart.scss'

import Vue from 'vue'
import axios from 'axios'
import url from '@/modules/js/api.js'

import Footer from '../../components/m-footer'


new Vue({
  el: '#app',
  data: {
    fuck: 'fuckkkkkkkkk'
  },
  components: {
    'm-footer': Footer

  }
})
