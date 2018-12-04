<template>
  <div>
    <div class="box"></div>
    <ul>
      <li v-for="list in lists" :key="list.id">
        <img :src="list.img" alt="">
        {{list.name}}
        {{list.price}}
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/modules/js/api.js'

  export default {
    name: "app",
    data(){
      return {
        lists: null,
      }
    },
    methods: {
      getLists(){
        axios.get(url.hotLists, {
          params: {
            pageNum: 1,
            pageSize: 6
          }
        }).then((res) => {
          console.log(res.data.lists)
          this.lists = res.data.lists
        })
      }
    },
    created(){
      console.log(url.hotLists)
      this.getLists()
    }
  }
</script>

<style lang="scss" scoped>
  .box{
    border: 1px solid black;
    height: 400px;
    background: #dfff8f;
    margin-bottom: 10px;
  }
  ul {
    /*border: 1px solid black;*/
    width: 95%;
    min-height: 100vh;
    margin: 0 auto 0 auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    li {
      padding: 5px;
      border: 1px solid red;
      display: inline-block;
      width: 190px;
      height: 230px;
      margin-bottom: 10px;
    }
  }
</style>
