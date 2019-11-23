<template>
    <li @click="handleClick(item.searchWord)">
        <i class="num">{{count+1}}</i>
        <div>
            <p class="name">{{item.searchWord}}</p>
            <p class="detail">{{item.content}}</p>
        </div>
        <span class="score">{{item.score}}</span>
    </li>
</template>

<script>
export default {
    props:{
        item:{
            type:Object
        },
        count:{
            type:Number
        }
    },
    methods: {
        handleClick(data){
            this.$router.push('/searchdetail/'+this.item.searchWord)
        }
    },
}
</script>

<style scoped lang="stylus">
@import "~assets/stylus/border.styl"
li 
  display flex
  height .68rem
  justify-content center
  align-items center
  $border(0 0 1px 0,#dbdbdb,solid)
  span 
    line-height .68rem
  div 
    flex 1
    .name
      color #000
      font-size .16rem
    .detail
      color #a5a5a5
      font-size .12rem
  .num 
    color #ef3c3a
    font-size .18rem
    margin-right .15rem
  .score 
    color #d6d6d6
</style>