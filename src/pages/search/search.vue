<template>
    <div class="wrap">
        <ul class="scrollul">
            <searchli
            v-for="(item,index) in hotlist"
            :key="index"
            :item="item"
            :count="index"
            ></searchli>
        </ul>
         <div class="header">
            <a href="/index/find" class="yo-ico">&#xe608;</a>
            <i class="cancle yo-ico" @click="cancleSearch" v-if="keyword">&#xe61f;</i>
            <input type="text" :placeholder="showKeyword" v-model="keyword">
        </div>
        <ul class="sulpdown" v-if="keyword">
            <div class="title">搜索“{{keyword}}”</div>
            <suggessitem
            v-for="(item, index) in sugggestList"
            :key="index"
            :sussgess="item"
            ></suggessitem>
        </ul>
        <songplay></songplay>
    </div>
</template>

<script>
import { get } from 'utils/http.js'
import searchli from './searchitem'
import BScroll from 'better-scroll'
import songplay from '../songlistdetail/song'
import suggessitem from './suggessitem'
import _ from 'lodash'
export default {
    data() {
        return {
            realkeyword: "",
            showKeyword: "",
            hotlist:[],
            keyword:'',
            sugggestList:[]
        }
    },
    components:{
        searchli,
        songplay,
        suggessitem
    },
    async mounted() {
        //默认搜索数据
        let result = await get({
            url:'/api/search/default'
        })
        this.showKeyword = result.data.showKeyword
        this.realkeyword = result.data.realkeyword
        //热搜列表
        let hotsearch = await get({
            url:'/api/search/hot/detail'
        })
        this.hotlist = hotsearch.data
        await this.$nextTick()
        let bScroll = new BScroll(('.wrap'), {
            click: true,
            taps: true
        })
    },
    watch: {
        keyword:_.debounce(async function(newval, oldval){
            if(newval){
                let result = await get({
                    url:`/api/search/suggest?keywords= ${newval}&type=mobile`
                })
                this.sugggestList = result.result.allMatch
                console.log(result)
            }
        },500)
    },
    methods: {
        cancleSearch(){
            this.keyword=''
        }
    }
}
</script>

<style scoped lang="stylus">
@import "~assets/stylus/border.styl"
.wrap
  width 100%
  height 100%
  background #fff
  overflow hidden
  .header
    padding .2rem .15rem .2rem .15rem
    height .6rem
    display flex
    align-items center
    position fixed
    z-index 10001
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
  .scrollul 
    padding .6rem .2rem .9rem .2rem
.wrap 
  >div:nth-child(3)
    position fixed
    bottom 0
    width 100%
    >div 
      margin 0
.sulpdown
  position fixed
  z-index 999 
  width 100%
  height 100%
  padding .6rem .2rem
  background #fff
  bottom 0
  .title
    color #4777ab
    font-size .14rem
    $border(0 0 1px 0,#dbdbdb,solid)
    padding-bottom .1rem
  li 
    $border(0 0 1px 0,#dbdbdb,solid)
</style>