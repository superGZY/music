<template>
    <div class="mainwrap">
        <div class="item">
            <videoitem 
            v-for="(item,index) in list"
            :key="index"
            :item="item"
            ></videoitem>
            <van-loading size="24px" v-if="waiting">努力加载中...</van-loading>
        </div>
        <div class="select">
            <van-collapse v-model="activeNames">
                <van-collapse-item name="1">
                    <div slot="title">
                        筛选
                    </div>
                    <ul class="area">
                        <li 
                        v-for="(item,index) in area" 
                        :key="index" 
                        :class="index===i?'active':''" 
                        @click="handleClick(item,index,area)"
                        >
                        {{item}}
                        </li>
                    </ul>
                    <ul class="type">
                        <li 
                        v-for="(item,index) in type" 
                        :key="index" 
                        :class="index===j?'active':''" 
                        @click="handleClick(item,index,type)"
                        >
                        {{item}}
                        </li>
                    </ul>
                    <ul class="order">
                        <li 
                        v-for="(item,index) in order" 
                        :key="index" 
                        :class="index===k?'active':''" 
                        @click="handleClick(item,index,order)"
                        >
                        {{item}}
                        </li>
                    </ul>
                </van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>

<script>
import { get } from 'utils/http.js'
import videoitem from 'components/video/videoitem'
import BScroll from 'better-scroll'
import Vue from 'vue';

import { Collapse, CollapseItem,Icon,Loading } from 'vant';
Vue.use(Collapse).use(CollapseItem).use(Icon).use(Loading);
export default {
    data() {
        return {
            list:[],
            activeNames: [],
            i:1,
            j:1,
            k:1,
            area:['地区:','全部','内地','港台','欧美','日本','韩国'],
            type:['类型:','全部','官方版','原生','现场版','网易出品'],
            order:['排序:','上升最快','最热','最新'],
            waiting:false
        }
    },
    components:{
        videoitem
    },
    created() {
        this.bScroll=''
    },
    async mounted() {
        let result = await get({
            url:'/api/mv/all'
        })
        this.list = result.data
        await this.$nextTick()
        this.bScroll = new BScroll(('.mainwrap'), {
            click: true,
            taps: true,
            pullUpLoad:true
        })
        let that = this
        this.bScroll.on('pullingUp',async function(){
            that.waiting = true
            let result = await get({
                url:`/api/mv/all?area=${that.area[that.i]}&type=${that.type[that.j]}&order=${that.order[that.k]}`
            })
            that.list = [
                ...that.list,
                ...result.data
            ]
            await that.$nextTick()
            this.refresh()
            this.finishPullUp()
            that.waiting = false
        })
    },
    methods: {
        async handleClick(data,index,type){
            index= index===0?1:index
            if(type[0]==='地区:'){
                this.i = index
            }
            else if(type[0]==='类型:'){
                this.j = index
            }
            else{
                this.k = index
            }
            let result = await get({
                url:`/api/mv/all?area=${this.area[this.i]}&type=${this.type[this.j]}&order=${this.order[this.k]}`
            })
            this.list = result.data
            await this.$nextTick()
            this.bScroll.refresh()
        }
    },
}
</script>

<style scoped lang="stylus">
@import '~assets/stylus/border.styl';
.mainwrap
    height 100%
    overflow hidden
    background #fff
    .item
      display flex
      flex-wrap wrap
      justify-content space-between
      padding .5rem .15rem .2rem .15rem
    .select
      position fixed
      top .4rem
      width 100%
      background #fff
      height .44rem
      .area,.type,.order
        display flex
        padding .05rem 0
        li:first-child 
          color #000
        li 
          padding 0 .05rem
          margin 0 .05rem
.active
  color #f43c3c
.van-loading
  width 100%
  text-align center
</style>