<template>
    <div class="wrap">
        <div class="bg">
            <a href="/index/find" class="yo-ico back">&#xe608;</a>
            <a  class="yo-ico question">&#xe856;</a>
            <div class="date"><span>{{day}}</span>/<span>{{mounth}}</span></div>
            <div class="lishitag">历史日推</div>
        </div>
        <div class="content">
          <div class="scroll">
              <p class="title">
                  <i class="bofang yo-ico">&#xe61d;</i>
                  <span>播放全部</span>
                  <span class="fr">多选</span>
              </p>
              <ul>
                  <list
                  v-for="(item,index) in list"
                  :key="index"
                  :item="item"
                  ></list>
              </ul>
          </div>
        </div>
    </div>
</template>

<script>
import { get } from 'utils/http.js'
import moment from "moment"
import list from './everydaylist'
import Bscroll from 'better-scroll'
export default {
  data() {
    return {
      mounth:0,
      day:0,
      list:[],
      musicss:{}
    }
  },
  components:{
    list
  },
  async mounted() {
    this.mounth = moment().format('M'); 
    this.day = moment().format('D'); 
    let result = await get({
      url:'/api/recommend/songs'
    })
    this.list = result.recommend
    let bscroll = new Bscroll(('.content'),{
      click: true,
      taps: true,
      pullUpLoad:true
    })
  }
}
</script>

<style scoped lang="stylus">
.wrap
  height 100%
  display flex
  flex-direction column
  .bg
    background pink
    width 100%
    height 2.28rem
    position relative
    .back
      position absolute
      left .14rem
      top .2rem
      color #fff
      font-size .24rem
    .question
      position absolute
      top .2rem
      right .4rem
      color #fff
      font-size .34rem
    .date
      color #fff
      position absolute
      bottom .8rem
      left .3rem
      font-size .2rem
      span:first-child 
        font-size .4rem
        line-height 1
    .lishitag
      width 1.2rem
      height .3rem
      background #fff
      border-radius .5rem
      font-size .14rem
      color #414143
      line-height .3rem
      text-align center
      position absolute
      left .18rem
      bottom .45rem
.content
  flex 1
  overflow hidden
  position relative
  top -.2rem
  background #ffffff
  width 100%
  padding .1rem .15rem 0 .15rem
  border-radius .16rem .16rem 0 0
  .title
    .bofang
      font-size .2rem
      position relative
      top -.01rem
      margin-right .06rem
    font-size .16rem
    .fr 
      float right
  ul 
    padding-bottom .9rem
    li 
      height .44rem
</style>