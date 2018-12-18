import '@/modules/css/common.css'
import './member.scss'

import Vue from 'vue'
import axios from 'axios'
import url from '@/modules/js/api.js'

import Footer from '../../components/m-footer'


new Vue({
  el: '#app',
  data: {
    fuck: 'hello,fuckkkkkkkkk'
  },
  components: {
    'm-footer': Footer
  }
})
