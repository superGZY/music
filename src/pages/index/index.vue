<template>
  <div class="index-wrap">
    <header>
      <router-link to="/profile" tag="span" active-class="active">
        <a class="yo-ico ">&#xe62f;</a>
      </router-link>
      <router-link to="/index/my" tag="span" active-class="active">
        我的
      </router-link>
      <router-link to="/index/find" active-class="active" tag="span">
        发现
      </router-link>
      <router-link to="/index/video" tag="span" active-class="active">
        视频
      </router-link>
      <router-link to="/search" tag="span" active-class="active">
        <a class="yo-ico">&#xe61a;</a>
      </router-link>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
//组件betterscroll
export default {

}

</script>

<style lang="stylus" scoped>
.index-wrap
  height 100%
  display flex
  flex-direction column
  main
    flex-grow 1
    overflow hidden
  header
    height .54rem
    width 100%
    background #fff
    display flex
    padding 0 .1rem .1rem .1rem
    flex-shrink 0
    span 
      flex 1
      font-size .16rem
      text-align center
      color #bbb
      &.active
        color #000
      a 
        font-size .3rem
        color  #bbb
    >span:first-child
      text-align left
    >span:last-child
      text-align right
</style>
