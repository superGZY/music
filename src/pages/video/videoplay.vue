<template>
    <div class="video-wrap">
        <div class="main-scroll">
          <div class="video">
            <div class="name">{{data.name}}</div>
            <p class="playcount"><span>{{ Math.ceil(data.playCount/1000)}}万次观看</span></p>
            <div class="icon">
                <div><i :class="like? 'active yo-ico':'yo-ico'" @click="likeCilck(data.id)">&#xe67e;</i><p>{{data.likeCount}}</p></div>
                <div><i class="yo-ico">&#xe61e;</i><p>{{data.subCount}}</p></div>
                <div><i class="yo-ico">&#xe622;</i><p>{{data.commentCount}}</p></div>
                <div><i class="yo-ico">&#xe684;</i><p>{{data.shareCount}}</p></div>
            </div>
          </div>
          <div class="recommoned">
            <p class="title">相关推荐</p>
            <div class="content"
            v-for="(item,index) in recommend"
            :key = "index"
            :item = "item"
            :data-id="item.id"
            @click ="handleClick(item.id)" 
            >
              <img :src="item.cover" >
              <div class="desc">
                <p class="names">{{item.name}}</p>
                <p class="bedesc">{{item.briefDesc}}</p>
              </div>
            </div>
          </div>
          <div class="talk">
            <p class="title">热门评论</p>
            <div class="commen"
            v-for="(item,index) in comments"
            :key="index"
            :data-id="item.commentId"
            >
              <img :src="item.user.avatarUrl">
              <div class="namebox">
                <p class="username">{{item.user.nickname}}</p>
                <p class="date">{{mounth}}月{{day}}日</p>
                <p class="content">{{item.content}}</p>
              </div>
              <span class="zan">{{item.likedCount}}<i class="yo-ico">&#xe67e;</i></span>
            </div>
          </div>
          <van-loading size="24px" v-if="waiting">努力加载中...</van-loading>
        </div>
        <video-player  class="video-player vjs-custom-skin"
            ref="videoPlayer" 
            :playsinline="true" 
            :options="playerOptions"
        ></video-player>
    </div>
</template>

<script>
  // Similarly, you can also introduce the plugin resource pack you want to use within the component
  // import 'some-videojs-plugin'
  import { get } from 'utils/http.js'
  import 'video.js/dist/video-js.css'
import Bscroll from 'better-scroll'
import Vue from 'vue'
import { videoPlayer } from 'vue-video-player'
import {Loading} from 'vant'
Vue.use(Loading)
import moment from "moment"
  export default {
    components:{
        videoPlayer
    },
    data() {
      return {
        data:'',
        recommend:[],
        like:false,
        comments:[],
        mounth:'',
        day:'',
        waiting:false,
        playerOptions : {
            playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
            autoplay: false, //如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 导致视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [{
                type: "video/mp4",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm" //url地址
            }],
            poster: "", //你的封面地址
            // width: document.documentElement.clientWidth, //播放器宽度
            notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true  //全屏按钮
            }
        }
      }
    },
    created() {
      this.total= 0
      this.offset  = 0,
      this.now = 0
    },
    async mounted() {
      this.mounth = moment("/Date(1553256749126-0700)/").format('M')
      this.day = moment("/Date(1553256749126-0700)/").format('D')
      //mv详情
      let result = await get({
          url:`/api/mv/detail?mvid=${this.$route.params.id}`
      })   
      this.data = result.data
      this.playerOptions.poster = this.data.cover
      //mv播放地址
      let url = await get({
          url:`/api/mv/url?id=${this.$route.params.id}`
      }) 
      this.playerOptions.sources[0].src=url.data.url
      //相关mv推荐
      let recom = await get({
          url:`/api/simi/mv?mvid=${this.$route.params.id}`
      }) 
      this.offset++
      this.recommend = recom.mvs
      //热门评论
      let hottalk = await get({
          url:`/api/comment/hot?id=${this.$route.params.id}&type=1`
      }) 
      this.comments = hottalk.hotComments
      this.total = hottalk.total
      this.now +=20
      //better-scroll
      await this.$nextTick()
      let bScroll = new Bscroll(('.video-wrap'),{
        click: true,
        taps: true,
        pullUpLoad:true
      })
      let that = this
      bScroll.on('pullingUp',async function(){
        this.waiting = true
        if(that.now < that.total){
          let hottalk = await get({
            url:`/api/comment/hot?id=${that.$route.params.id}&type=1&offset=${that.offset*20}`
          }) 
          that.comments =[
            ...that.comments,
            ...hottalk.hotComments
          ]
          that.now +=20
          that.offset++
          await that.$nextTick()
          this.refresh()
        }
        this.finishPullUp()
        this.waiting = false
      })
    },
    methods: {
      handleClick(id){
        this.$router.push({path:'/videoplay/'+id})
      },
      async likeCilck(id){
        
        let type = this.like?0:1
        let result = await get({
            url:`/api/resource/like?t=${type}&type=1&id=${id}`
        }) 
        if(result.code === 200){
          this.like = !this.like
        }
      }
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0)
        }
    }
  }
</script>
<style scoped lang="stylus">
@import '~assets/stylus/border.styl'
.video-wrap
  width 100%
  height 100%
  overflow hidden
.main-scroll
  padding-top 57%
.video
  background #fff
.name
  padding .1rem .15rem
  font-size .16rem
.icon
  padding .15rem .15rem
  display flex 
  justify-content space-between
  div 
    text-align center
    i 
      font-size .22rem
.playcount
  padding 0 .15rem
  span 
    font-size .12rem
    color #a3a3a3
.line 
  background #f8f8f8
  width 100%
  height .1rem
.recommoned
  margin-top .1rem
  background #fff
  padding 0 .15rem .2rem .15rem
  .title
    padding .1rem 0
  .content
    display flex
    margin-bottom .1rem
    img 
      width 1.24rem
      height .7rem
      border-radius .04rem
      background #d1d1d1
      margin-right .1rem
    .desc 
      flex 1
      .names
        color #3b3b3c
        font-size .16rem
      .bedesc
        color #959595
.video-player
  position fixed
  top 0
  width 100%
.active 
  color red
.talk
  margin-top .1rem
  background #ffffff
  padding 0rem .15rem
  .title
    padding .1rem 0
  .commen
    display flex
    padding-top .1rem 
    img 
      width .3rem
      height .3rem
      border-radius 50%
      margin-right .1rem
    .namebox
      flex 1
      padding-bottom .14rem
      $border(0 0 1px 0, #d4d3d3, solid)
      .username
        color #656566
        font-size .13rem
      .date
        color #ababab
        font-size .12rem
        line-height 1
        margin-bottom .06rem
    .zan
      color #9c9c9c
      line-height .16rem
      i
        margin-left .04rem
        position relative
        top -.02rem
.van-loading 
  height .6rem
  text-align center
  line-height .6rem
  background #fff
</style>