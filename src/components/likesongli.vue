<template>
  <li :data-id="item.id" @click="handleClick">
    <img :src="item.coverImgUrl">
    <div>{{item.name}}<p>{{item.trackCount}}首</p></div>
    <i class="yo-ico">&#xe6fc;</i>
  </li>
</template>
<script>
import { get } from 'utils/http.js'
export default {
    props:{
      item:{
        type:Object
      }
    },
    methods: {
      handleClick(){
        this.$router.push({
          name:'songlistdetail',
          params:{"id":this.item.id}
        })
      }
    },
}
</script>

<style scoped lang="stylus">
li 
  height .6rem
  font-size .16rem
  margin-bottom .12rem
  margin-right .2rem
  overflow hidden
  img 
    width .58rem
    height .58rem
    border-radius .1rem
    margin-right .12rem
    float left
  div
    float left
    height 100%
    display flex
    flex-direction column
    justify-content center
    p 
      color #929292
      font-size .12rem
  i
    float right 
    line-height .6rem
    font-size .2rem
</style>
