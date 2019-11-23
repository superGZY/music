<template>
    <div class="wrap">
        <ul>
          <liitem 
          v-for="(item,index) in list"
          :item="item"
          :key="index"
          :index="index"
          ></liitem>
        </ul>
        <div class="header">
            <a href="javascript:history.go(-1);" class="yo-ico">&#xe608;</a>
            <i class="cancle yo-ico" @click="cancleSearch" v-if="keyword">&#xe61f;</i>
            <input type="text" :value="keyword">
        </div>
        <songplay></songplay>
    </div>
</template>

<script>
import { get } from 'utils/http.js'
import liitem from './searchdetail-item'
import BScroll from 'better-scroll'
import songplay from '../songlistdetail/song'
export default {
    data() {
        return {
            keyword:this.$route.params.keyword,
            list:[],
            songcount:0
        }
    },
    components:{
      liitem,
      songplay
    },
    created() {
      this.offset=0
      this.count =30
    },
    async mounted() {
      let result = await get({
        url:`/api/search?keywords= ${this.keyword}&offset=${this.offset}`
      })
      this.list = result.result.songs
      this.songcount = result.result.songCount
      let bScroll = new BScroll(('.wrap'), {
        click: true,
        taps: true,
        pullUpLoad:true
      })
      let that = this
      bScroll.on('pullingUp',async function(){
        that.offset ++ 
        that.count  +=30
        let album2= await get({
          url:`/api/search?keywords= ${that.keyword}&offset=${that.offset}`
        })
        that.list = [
          ...that.list,
          ...album2.result.songs
        ]
        await that.$nextTick()
        this.refresh()
        this.finishPullUp()
      })
    },
    methods: {
      cancleSearch(){
        this.$router.push({name:'search'})
      }
    },
}
</script>
<style scoped lang="stylus">
.wrap
  width 100%
  height 100%
  background #fff
  overflow hidden
  .header
    padding .2rem .15rem .2rem .15rem
    position relative
    height .6rem
    display flex
    align-items center
    position fixed
    width 100%
    background #fff
    left 0
    top 0
    a 
      color #000
      font-size .2rem
      margin-right .2rem
    .cancle
      position absolute
      right .26rem
      color #c4c4c4
      font-size .18rem
    input
      color #000
      flex 1
      height .36rem
      font-size .16rem
      border none 
      text-indent .2rem
      background #f7f7f7
      border-radius .18rem
    input::-webkit-input-placeholder
      color #b5b5b5
      font-size .16rem
ul 
  padding .8rem .2rem .9rem .2rem
.wrap 
  >div:nth-child(3)
    position fixed
    bottom 0
    width 100%
    >div 
      margin 0
</style>