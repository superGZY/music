<template>
    <div class="wrap">
      <van-collapse v-model="activeNames">
        <van-collapse-item name="1">
          <div slot="title">
            <p><i></i>创建的歌单({{createdPlaylistCount}})<i class="yo-ico">&#xe6fc;</i><i class="yo-ico">&#xe64f;</i></p>  
          </div>
          <ul>
            <likesongli 
            v-for="item in list"
            :key="item.id"
            :item="item"
            ></likesongli>
          </ul>
        </van-collapse-item>
      </van-collapse>
        
        
    </div>
</template>
<script>
import likesongli from 'components/likesongli.vue'
import { get } from 'utils/http.js'
import Vue from 'vue';
import { Collapse, CollapseItem } from 'vant';
Vue.use(Collapse).use(CollapseItem);
export default {
    props:{
      createdPlaylistCount:{
        type:Number
      }
    },
    data() {
      return {
        list:[],
        activeNames: ['1']
      }
    },
    components:{
        likesongli
    },
    async mounted() {
      let result = await get({
        url:`/api/user/playlist?uid=${this.$store.state.userid}`
      })
      this.list = result.playlist
      let test = await get({
        url:'/api/playlist/detail?id=3078938205'
      })
      console.log(test)
    },
}
</script>

<style scoped lang="stylus">
.wrap
  background #fff
  padding 0 .1rem
  P 
    font-size .16rem
    i 
      font-size .32rem
      vertical-align center
    i:nth-child(2)
      font-size .2rem
      float right
      line-height .48rem
    i:last-child 
      float right
.van-cell__title
  div 
    height 100%
    line-height .48rem
.van-icon
  margin-top .2rem
</style>