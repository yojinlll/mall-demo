<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="list in lists">
        <img :src="list.img" alt="">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    name: "mallSwipe",
    props: {
      lists: {
        type: Array,
        required: true
      }
    },
    mounted(){
      new Swiper('.swiper-container', {
        loop: true,
        autoplay: {delay: 3000},
        pagination: {
          el: '.swiper-pagination',
        },

      })
    }
  }
</script>

<style lang="scss">
</style>
