<template>
  <div class="mall-footer">
    <div class="item">分类</div>
    <div class="item">购物车</div>
    <div class="item">我</div>
  </div>
</template>

<script>
  export default {
    name: "mallFooter"
  }
</script>

<style lang="scss" scoped>
  .mall-footer{
    height: 60px; width: 100%;
    background: #725cc7;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;

    .item{
      color: white;
      line-height: 30px;
      padding: 10px;
      margin: auto;
    }
  }


</style>
