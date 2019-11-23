<template>
    <div class="profile-Wrap">
        <div class="bg" :style="{backgroundImage: 'url(' + profile.backgroundUrl + ')', backgroundSize:'contain'}">
            <a class="yo-ico back" href="javascript:history.back();">&#xe608;</a>
            <a href="" class="headimg" :style="{backgroundImage:'url('+profile.avatarUrl+')',backgroundSize:'contain'}"></a>
            <h2>{{profile.nickname}}</h2>
            <p>
                <span>关注</span>
                <span>10</span>
                <span>粉丝</span>
                <span>7</span>
            </p>
            <div class="age">95后</div>
            <div class="lv">lv.{{result.level}}</div>
        </div>
        <div class="detail-profile">
            <ul>
                <li><span>主页</span></li>
                <li>动态</li>
            </ul>
        </div>
    </div>
</template>

<script>
import {get} from 'utils/http.js'
export default {
  data() {
    return {
      profile:'',
      result:''
    }
  },
  async mounted() {
    let result = await get({
      url:`/api/user/detail?uid=${this.$store.state.userid}`
    })
    this.profile = result.profile
    this.result = result
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/stylus/border.styl"
.bg
  width 100%
  height 3.2rem
  padding .2rem .2rem 0
  .back
    font-size .2rem
    color #fff
  .headimg
    display block
    width .8rem
    height .8rem
    background #ffffff
    border-radius 50%
    margin-top .76rem
  h2 
    font-size .2rem
    color #fff 
    font-weight normal
    margin-top .1rem
  span
    color #fff
    margin 0 .04rem
  .age,.lv
    display inline-block
    width .4rem
    height .2rem
    background: rgba(255,255,255,0.3);
    color #fff
    border-radius .1rem
    text-align center
    font-size .12rem
    line-height .2rem
    margin-top .1rem
  .lv
    margin-left .04rem
.detail-profile
  background #fff
  position relative
  margin-top -.2rem
  border-radius .2rem .2rem 0 0
  ul 
    $border(0 0 1px 0, #ccc, solid )
    display flex
    li 
      height .4rem
      line-height .4rem
      text-align center
      flex 1
      span
        display inline-block
        $border(0 0 4px 0, red, solid )
        height .4rem
</style>