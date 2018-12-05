<template>
  <div class="mall-footer">
    <div class="item" :class="{active: index === currentIndex }" @click="selected(list.href,index)" v-for="(list,index) in navConfig">
      <!--<a :href="list.href">{{list.name}}{{index}}</a>-->
      {{list.name}}
    </div>
  </div>
</template>

<script>
  let navConfig = [
    {
      name: '主页',
      href: 'index.html'
    },
    {
      name: '分类 ',
      href: 'category.html'
    },
    {
      name: '购物车',
      href: 'cart.html'
    },
    {
      name: '个人',
      href: 'member.html'
    },
  ]

  export default {
    name: "mallFooter",
    data(){
      return {
        navConfig,
        currentIndex: 0
      }
    },
    mounted(){
      this.getHrefIndex()
    },
    methods: {
      selected(href,index){
        location.href = `${href}?index=${index}`;
      },
      getHrefIndex(){
        if(location.search){
          this.currentIndex = +(location.search.substr(-1)) || 0
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mall-footer {
    height: 60px; width: 100%;
    background: #5fc3c7;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;

    .item {
      height: 100%;
      line-height: 30px;
      padding: 15px;
      margin: auto;

      a {
        color: white;
      }
    }

    .active {
      background: #ff9580;
    }
  }


</style>
