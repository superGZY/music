<template>
    <div class="wrap">
        <div class="title"><a class="yo-ico" href="/res">&#xe608;</a>手机号验证</div>
        <div class="tips">
            <p class="text">验证码已发送至</p>
            <div class="timewrap">
                <p class="num">{{ phone|filterReplace }}</p>
                <van-count-down
                :time="time"
                format=" ss S"
                />
            </div>
        </div>
        <!-- 密码输入框 -->
        <van-password-input
        :value="value"
        info="验证码为 4 位数字"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
        :length="4"
        />
        <div class="tip"><i class="yo-ico">&#xe611;</i>验证码错误</div>
        <!-- 数字键盘 -->
        <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
        />
    </div>
</template>
<script>
import { get } from 'utils/http.js'
import Vue from 'vue';
import { PasswordInput, NumberKeyboard,CountDown } from 'vant';

Vue.use(PasswordInput).use(NumberKeyboard).use(CountDown);
export default {
    data() {
    return {
      value: '',
      showKeyboard: true,
      phone:this.$route.params.phone || 1866666666,
      time:60000
    };
  },

  methods: {
    async onInput(key) {
      this.value = (this.value + key).slice(0, 4);
      if(this.value.length == 4){
          let result = await get({
              url:`/api/captcha/verify?phone=${this.phone}&captcha=${this.value}`
          })
          console.log(result)
      }
      if(result.code === 200)
        this.$router.push({name:'indexfind',params:{phone:this.phone,pwd:this.$route.paramspwd,nickname:this.$route.paramsnickname}})
      else
        console.log(0)
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  },
  filters:{
      filterReplace(value){
          return value.slice(0, 3) + '****' + value.slice(7)
      }
  }
}
</script>

<style scoped lang="stylus">
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
  .tips
    margin.4rem 0
    text-align left
    font-size .18rem
    .num 
      color #ccc
.timewrap
    overflow hidden
    line-height .24rem
    .num
        float left
    .van-count-down
        float right
        color #ccc
        font-size .18rem
.van-password-input__security
    &::after 
      border-color #000
    .van-hairline--left::after
        border-left-color : #000;
.van-number-keyboard__body
    background #ccc
    .van-hairline.van-key::after
        border-color #000
.tip
  height .3rem
  text-align center
  font-size .18rem
  color red 
  margin-top .3rem
  i 
    font-size .2rem
    position relative
    top -.02rem
</style>