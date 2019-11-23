<template>
    <div class="wrap">
        <img class="logo" src="../../../public/logo.jpg"/>
        <div class="mes">
            <div class="btn">
                <div class="logbtn" @click="handleClick">手机号登录</div>
                <div class="unlogbtn">立即体验</div>
                <div class="fastlog">
                    <a class="yo-ico">&#xe63e;</a>
                    <a class="yo-ico">&#xe666;</a>
                    <a class="yo-ico">&#xe63d;</a>
                    <a class="yo-ico">&#xe69d;</a>
                </div>
            </div>
            <div class="tag">
                <span class="box" @click="handleBoxclick">{{agree}}</span>同意<span>《服务条款》</span>
            </div>
        </div>
         <div class="alert" v-if="isshow">请先勾选同意协议</div>
    </div>
</template>

<script>
export default {
    data() {
     return {
       agree:'',
       isshow:false
     }
   },
    methods: {
        handleClick(){
          if(this.agree)
            this.$router.push({name:'phonelogin'})
          else{
            this.isshow = true
            let timer=''
            clearTimeout(timer)
            timer = setTimeout(()=>{
              this.isshow = false
            },1000)
          }
        },
        handleBoxclick(){
          this.agree = this.agree?'':'√'
        }
    }
}
</script>

<style scoped lang="stylus">
@import "~assets/stylus/border.styl"
.wrap 
  background #d4301c
  width 100%
  height 100%
  overflow hidden
  position relative
  .logo
    width 36.2%
    border-radius 50%
    position absolute
    left 32.1%
    top 18.75%
.mes
  width 100%
  height 42%
  position absolute
  bottom 0
  flex-direction column
  align-items center
  justify-content space-between
  .btn 
    width 100%
    .logbtn,.unlogbtn
      width 74%
      height .5rem
      background #ffffff
      border-radius .25rem
      font-size .19rem
      color red 
      line-height .5rem
      text-align center
      margin 0 auto
    .unlogbtn
      margin-top .2rem
      background none 
      border 1px solid #fff
      color #fff
  .fastlog
    display flex
    justify-content space-around
    padding 0 .4rem
    margin-top .4rem
    margin-bottom .34rem
    a 
      display inline-block
      color #fff 
      font-size .3rem
      width .44rem
      height .44rem
      $border(1px solid #eee)
      &::after
        border-radius 50%
      line-height .44rem
      text-align center
.tag
  text-align center
  color #eee
  .box
    display inline-block
    width .14rem
    height .14rem
    outline none
    background none
    border none
    $border(1px solid #eee)
    position relative
    top .02rem
    &::after
      border-radius 50%
  span
    color #eee
    margin 0 .06rem
.alert
  width 88.88%
  height .7rem
  line-height .7rem
  text-align center
  position absolute
  background-color:rgba(69,69,69,0.8)
  color #fff
  border-radius .35rem
  font-size .16rem
  bottom 10%
  left 5.56%
  z-z-index 99999
</style>