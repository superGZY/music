<template>
    <div class="wrap">
        <div class="bg" >
            <div class="poster" :style="{backgroundImage: 'url(' + playlist.backgroundCoverUrl + ')', backgroundSize:'contain'}"></div>
            <div class="title"><a class="yo-ico left one" href="javascript:history.back();">&#xe608;</a>歌单<a class="yo-ico right">&#xe634;</a><a class="yo-ico right">&#xe61a;</a></div>
            <div class="content">
                <img :src="coverImgUrl"/>
                <div class="detailmes">
                    <p class="name">{{playlist.name }}</p>
                    <p class="author-mes"><a class="author"><img :src="playlist.creator.avatarUrl "/></a><a>{{playlist.creator.nickname }}</a><a class="yo-ico">&#xe74b;</a></p>
                    <div class="detail"><span>{{playlist.description}}</span><a class="yo-ico">&#xe74b;</a></div>
                </div>
            </div>
            <div class="font">
                <a ><i class="yo-ico">&#xe658;</i>1212</a>
                <a ><i class="yo-ico">&#xe662;</i>1211</a>
                <a ><i class="yo-ico">&#xe66c;</i>下载</a>
                <a ><i class="yo-ico">&#xe656;</i>多选</a>
            </div>
        </div>
        <div class="bg-2">
          <div class="ad">含13首VIP专享歌曲</div>
          <div class="bg-3">
            <div class="header"><i class="yo-ico">&#xe61d;</i>播放全部<span>（共{{playlist.trackIds|length}}首）</span><a href="">+收藏（77.8万）</a></div>
            <div class="ulwrap">
              <ul>
                <listli 
                v-for="(item,index) in playlist.tracks"
                :key="item.id"
                :item="item"
                :index="index"
                @func = "handleplay"
                ></listli>
              </ul>
            </div>
          </div>
        </div>
        <song></song>
    </div>
</template>
<script>
import { get } from 'utils/http.js'
import listli from 'pages/songlistdetail/songitem.vue'
import BScroll from 'better-scroll'
import song from 'pages/songlistdetail/song.vue'
export default {
    data() {
        return {
            coverImgUrl:'',
            playlist:{
              backgroundCoverUrl:'',
              coverImgUrl:'',
              name:'',
              description:'',
              creator:{
                avatarUrl:'',
                nickname:''
              },
              tracks:[],
              trackIds:[]
            },
            musicss:{}, 
        }
    },
    components:{
      listli,
      song
    },
    async mounted() {
        let result = await get({
          url:`/api/playlist/detail?id=${this.$route.params.id}`
        })
        this.coverImgUrl = result.playlist.coverImgUrl
        if(!result.playlist.backgroundCoverUrl){
          result.playlist.backgroundCoverUrl = 'https://p2.music.126.net/MnRunqCGpe6eNvEhVexGLA==/109951164494292652.jpg'
        }
        this.playlist = result.playlist
        let bScroll = new BScroll(('.ulwrap'), {
          click: true,
          taps: true
        })
    },
    methods: {
      async handleplay(data){
        let result = await get({
          url:`/api/song/url?id=${data.id}`
        })
        this.musicss.src =`https://music.163.com/song/media/outer/url?id=${data.id}.mp3`
        let result2 = await get({
          url:`/api/lyric?id=${data.id}`
        })
        this.musicss.lrc= result2.lrc.lyric
        this.musicss.title = data.name
        this.musicss.artist = data.ar[0].name
        this.musicss.pic = data.al.picUrl
        this.$store.commit('setMusic',JSON.parse(JSON.stringify(this.musicss)) )
      }
    },
    filters:{
      length:function(data){
        return data.length
      }
    }
}
</script>

<style scoped lang="stylus">
.wrap
  height 100%
  display flex
  flex-direction column
  position relative
.bg
  width 100%
  height 49%
  padding .2rem .15rem 0 .15rem
  .left 
    float left
  .right 
    float right
  .poster
    width: 200%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    -webkit-filter: blur(.5rem);
    filter: blur(.5rem);
    background-size: cover;
    background-repeat: no-repeat;
    background-position -100% -50%
  .title
    font-size .2rem
    color #fff
    position relative
    a 
      color #fff
    .one 
      margin-right .1rem
    .right 
      font-size .3rem
      line-height 1
  .content
    position relative
    margin-top .3rem
    display flex
    img 
      width 1.45rem
      height 1.45rem
      margin-right .2rem
    .detailmes
      flex 1
      color #fff
      .name 
        font-size .18rem
        margin-right .1rem
      .author
        display inline-block 
        width .3rem
        height .3rem
        border-radius 50%
        margin-right .1rem
        img 
          width 100%
          height 100%
          border-radius 50%
      .author-mes
        margin-top .1rem
        margin-bottom .3rem
        a
          vertical-align middle
          color #eee
          font-size .16rem
    .detail
      display flex
      align-items center
      span 
        color #ddd
        flex 1
        font-size .14rem
        line-height .26rem
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        width 100%
      a 
        color #ddd
        font-size .18rem
        margin 0 .2rem 0 .3rem
  .font
    position relative
    display flex
    justify-content space-around
    margin-top .2rem
    a 
      color #fff
      display flex 
      flex-direction column
      font-size .16rem
      text-align center
      i 
        font-size .22rem
.bg-2
  background #d1d3d2
  width 100%
  flex 1 
  position relative
  top -.21rem
  border-radius .2rem .2rem 0 0 
  overflow hidden
  .ad
    height  .6rem
    line-height .6rem
    margin-left .2rem
    font-size .16rem
  .bg-3
    width 100%
    height 100%
    background #fff 
    border-radius .2rem .2rem 0 0
    display flex
    flex-direction column
    position relative
    .ulwrap
      flex 1
      overflow hidden
    .header
      height .56rem
      font-size .16rem
      line-height .56rem
      padding 0 .15rem
      i 
        font-size .22rem
        margin-right .2rem
      a 
        width 1.52rem
        height .44rem
        display block
        float right 
        background #fe3b39
        border-radius .22rem
        margin-top .06rem
        color #eee
        line-height .44rem
        text-align center
.wrap
  >div:nth-child(3)
    position fixed
    width 100%
    bottom 0
</style>