<template>
    <div class="wrap">
        <ul class="dot">
            <li><a class="yo-ico">&#xe61b;</a>私人FM</li>
        </ul>
        <ul class="mylist">
            <li><span class="yo-ico">&#xe600;</span> 最近播放（{{weekData|filtercount}}）</li>
            <li><span class="yo-ico">&#xe76a;</span>我的电台</li>
            <li><span class="yo-ico">&#xe619;</span>我的收藏</li>
        </ul>
        <songlist :createdPlaylistCount="createdPlaylistCount"></songlist>
    </div>
</template>

<script>
import songlist from 'components/songlist.vue'
import {get} from 'utils/http.js'
export default {
    components:{
        songlist
    },
    data() {
      return {
        createdPlaylistCount:0,
        weekData:[]
      }
    },
    async mounted() {
      let result = await get({
        url:`/api/user/subcount`
      })
      this.createdPlaylistCount = result.createdPlaylistCount
      let count = await get({
        url:`/api//user/record?uid=${this.$store.state.userid}&type=1`
      })
      this.weekData = count.weekData
    },
    filters:{
      filtercount:function(data){
        return data.length
      }
    }
}
</script>

<style scoped lang="stylus">
@import "~assets/stylus/border.styl"
.wrap 
  .dot 
    background #fff
    padding 0 .1rem
    li 
      padding-bottom .2rem
      padding-left .1rem
      font-size .13rem
      a
        display block
        width .48rem
        height .48rem
        border-radius 50%
        padding-bottom .06rem
        padding-top .2rem
        background red
        color #fff 
        font-size .3rem
        text-indent .1rem
        line-height .2rem
  .mylist
    background #fff
    padding 0 .1rem
    margin-bottom .1rem
    li
      $border(1px 0 0 0,#e1e1e1,solid)
      height .5rem
      line-height .5rem
      span 
        font-size .26rem
        margin 0 .2rem 0 .1rem
        float left
      &:last-child 
        span
          font-size .2rem
          margin-left .12rem
      &:nth-child(2)
        span 
          font-size .27rem
          
</style>