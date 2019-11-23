<template>
    <div class="wrap">
        <div class="title"><a href="/index/find" class="yo-ico">&#xe654;</a><h2>排行榜</h2></div>
        <main>
            <div class="scroll">
                <h3>官方榜</h3>
                <rankcom 
                v-for="item in list"
                :key="item.id"
                :item="item"
                ></rankcom>
                <h3>更多榜单</h3>
                <div class="rankomlist2">
                    <rankcom2 
                    v-for="item in list2"
                    :key="item.id"
                    :item="item"
                    ></rankcom2>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import rankcom from 'components/ranklist/rankcom.vue'
import rankcom2 from 'components/ranklist/rankcom2.vue'
import { get } from 'utils/http.js'
import BScroll from 'better-scroll'
export default {
    data() {
        return {
            list :[],
            list2:[]
        }
    },
    components:{
        rankcom,
        rankcom2
    },
    async mounted() {
        let result = await get({
            url:'/api/toplist/detail'
        })
        result.list.forEach(item => {
            if(item.ToplistType)
                this.list.push(item)
            else
                this.list2.push(item)
        });
        let bScroll = new BScroll(('main'), {
            click: true,
            taps: true
        })
    }
}
</script>

<style scoped lang="stylus">
.wrap
  background #fff 
  padding 0 .15rem
  height 100%
  display flex
  flex-direction column
  .title 
    font-size .2rem
    height .6rem
    line-height .6rem
    a 
      font-size .4rem
      position absolute
      color #555
    h2 
      font-weight 500
      text-align center
      font-size .2rem
main
  flex 1
  overflow hidden
  h3 
    font-size .18rem
    font-weight normal
    line-height .4rem
    &:before 
        content: '|';
        color: #ce3d3e;
        font-size: 20px;
        font-weight: 600;
        padding-right: 5px;
.rankomlist2
    display flex
    flex-wrap wrap
    justify-content space-between
</style>