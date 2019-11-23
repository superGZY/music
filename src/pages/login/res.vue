<template>
    <div class="wrap">
        <div class="title"><a class="yo-ico" href="phonelogin">&#xe608;</a>注册</div>
        <div class="number">
            <span>+86</span>
            <input placeholder="输入手机号" @input="handleInput" v-model="phone"/>
        </div>
        <div class="password">
            <span>密码：</span>
            <input type="password" placeholder="输入密码" @input="handlepwdInput" v-model="pwd"/>
        </div>
        <div class="nickname">
            <span>昵称：</span>
            <input placeholder="想让大家怎么称呼你呢？" @input="handleNameInput" v-model="nickname"/>
        </div>
        <transition name="fade">
            <div class="err" v-show="err"><i class="yo-ico">&#xe611;</i>用户名或密码错误</div>
        </transition>
        <div class="btn" :class="flag?'rightbtn':''" @click="handleNext">下一步</div>
    </div>
</template>

<script>
import { get } from 'utils/http.js'
export default {
    data() {
        return {
            phone:'',
            pwd:'',
            nickname:'',
            flag :false,
            err:false
        }
    },
    methods: {
        check(){
            if((/^1[34578]\d{9}$/.test(this.phone)) && this.pwd!='' && this.nickname !=''){
                this.flag = true
            }
            else{
                this.flag = false
            }
        },
        handleInput(){
            this.check()
        },
        handlepwdInput(){
            this.check()
        },
        handleNameInput(){
            this.check()
        },
        async handleNext(){
            let captcha =await get({
                url:`/api/captcha/sent?phone=${this.phone}`
            })
            this.$router.push({name:'number',params:{phone:this.phone,pwd:this.pwd,nickname:this.nickname}})
        }
    }
}
</script>

<style scoped lang="stylus">
@import "~assets/stylus/border.styl"
.wrap
  width 100%
  height 100%
  padding .24rem .15rem 0 .15rem
  position relative
  background #fefefe
  text-align center
  .title
    text-align center
    font-size .2rem
    a
      position absolute
      left .15rem
      top .24rem
      color #000
  .number,.password,.nickname
    text-align left
    margin-top .3rem
    color #cacaca
    $border(0 0 1px 0, #555,solid)
    padding .1rem 0
    font-size .18rem
    span
      color #000
      margin-right .1rem
    input 
      height .3rem
      padding 0
      border none
      color #000
    :-moz-placeholder  /* Mozilla Firefox 4 to 18 */
        color #cacaca;
    
    ::-moz-placeholder /* Mozilla Firefox 19+ */
        color #cacaca
    
    input:-ms-input-placeholder
        color #cacaca
    
    input::-webkit-input-placeholder
        color #cacaca
  .btn
    width 91.3%
    height .44rem
    margin .44rem auto
    line-height .44rem
    text-align center
    background  #f6cbc6
    color #f8d6d3
    border-radius .22rem
    font-size .2rem
  .rightbtn 
    background #ec3d29
    color #fff
.err
  font-size .18rem
  text-align center
  padding-top .2rem
  i 
    color red
    font-size .2rem
    position relative
    top -.02rem
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.tores
  color #000
</style>