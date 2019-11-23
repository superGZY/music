<template>
  <div class="main-wrap" >
      <div v-if="!isready" class="load">
          <div class="girl"></div>
          <p>加载中...</p>
      </div>
      <van-swipe  :autoplay="3000" indicator-color="#d43c33">
          <van-swipe-item
          v-for="bannerimg in banner"
          :key = "bannerimg.id"
          ><bannerli :bannerimg ="bannerimg" ></bannerli></van-swipe-item>
          <div class="swiper-pagination"  slot="pagination"></div>
      </van-swipe>
      <div class="nav">
          <a href="/everyday">
            <span><i class="yo-ico">&#xe789;</i></span>
            <p>每日推荐</p>
          </a>
          <a href="/rankinglist">
            <span><i class="yo-ico">&#xe636;</i></span>
            <p>歌单</p>
          </a>
          <a href="/rankinglist">
            <span><i class="yo-ico">&#xe782;</i></span>
            <p>排行榜</p>
          </a>
      </div>
      <div class="recommend">
          <h2 class="remd_tl">推荐歌单</h2>
          <div class="remd_ul">
            <rendli 
            v-for="(song,index) in recommendSong"
            :song ="song"
            :key="index"
            :type="'recomd'"
            ></rendli>
          </div>
          <h2 class="remd_tl">新碟</h2>
          <div class="remd_ul">
            <rendli 
            v-for="(albumone,index) in album"
            :song ="albumone"
            :key="index"
            :type="'new'"
            ></rendli>
          </div>
      </div>
      <van-loading size="24px" v-if="waiting">努力加载中...</van-loading>
      <div class="end" v-if="end">到底啦~</div>
  </div>
</template>
<script>
import Vue from 'vue'
//自己的组件
import rendli from 'components/remd-li.vue'
import bannerli from 'components/banner.vue'

//组件vant
import { Swipe, SwipeItem, Loading,Toast} from 'vant';
Vue.use(Swipe).use(SwipeItem).use(Loading).use(Toast);
import BScroll from 'better-scroll'
//http
import {get} from 'utils/http.js'
export default {
  components: {
    rendli,
    bannerli
  }, 
  data() {
    return {
      swiperOption: {
        hashNavigation: true
      },
      recommendSong:'',
      banner:'',
      album:'',
      isready: false,
      offset:0,
      count:0,
      total:'',
      end:false,
      up:true,
      waiting:'false'
    }
  },
  async mounted() {
    let result= await get({
      url:'/api/personalized?limit=9'
    })
    this.recommendSong = result.result
    let banner= await get({
      url:'/api/banner?type=2'
    })
    this.banner = banner.banners
    let album= await get({
      url:`/api/top/album?offset=${this.offset}&limit=6`
    })
    this.count +=6
    this.album = album.albums
    this.total = album.total
    await this.$nextTick()
    this.isready = true
    let bScroll = new BScroll(('main'), {
      click: true,
      taps: true,
      pullUpLoad:true
    })
    let that = this
    let req = true
    bScroll.on('pullingUp',async function(){
      that.waiting = true
      console.log(0)
      that.offset ++ 
      that.count  +=30
      let album2= await get({
        url:`/api/top/album?offset=${that.offset}&limit=30`
      })
      that.album = [
        ...that.album,
        ...album2.albums
      ]
      await that.$nextTick()
      this.refresh()
      that.waiting = false
      this.finishPullUp()
    })
  }
}

</script>

<style lang="stylus" scoped>
@import "~assets/stylus/border.styl"
.load
  width 100%
  height 100vh
  background #fff
  text-align center
  font-size .18rem
  .girl
    margin-top .4rem
    display inline-block
    width 180px
    height 300px
    background url(../../../public/charector.png)
    animation: run 1s infinite
    animation-timing-function step-start
    @keyframes run 
      0%
        background-position-x: 0;
      14.28%
          background-position-x: -180px;
      28.571%
          background-position-x: -360px;
      42.84%
          background-position-x: -540px;
      57.12%
          background-position-x: -720px;
      71.4%
          background-position-x: -900px;
      85.68%
          background-position-x: -1080px;
      100%
          background-position-x: 0;
.toplod
  width 100%
  height .6rem
  display flex
  justify-content center
  line-height .6rem
.van-loading 
  height .6rem
  text-align center
  line-height .6rem
.main-wrap
  overflow hidden
.nav
  display flex
  padding .15rem .1rem
  $border(0 0 1px 0,#666,solid)
  margin-bottom:.2rem
  a
    flex 1
    text-align center
    span
      width .48rem
      height .48rem
      display inline-block
      border-radius 50%
      background #d43c33
      text-align center
      i
        color #fff
        font-size .3rem
        line-height .5rem
    p
      color #000
      font-size .13rem
.recommend
  margin 0 .1rem
  .remd_tl
        position relative
        padding-left .09rem
        margin-bottom .14rem
        font-size .16rem
        height .2rem
        line-height .2rem
        font-weight normal
        &::after
          content: " ";
          position: absolute;
          left: 0;
          top: 50%;
          margin-top: -9px;
          width: .02rem;
          height: .16rem;
          background-color: #d33a31;
  .remd_ul
    display flex
    justify-content space-between
    flex-wrap wrap
    margin-bottom .2rem
.end
  font-size .2rem
  text-align center
  line-height .4rem
</style>
