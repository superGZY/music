<template>
    <div class="surge">
        <div class="wrap">
            <img :src="item.coverImgUrl"/>
            <p class="tag">{{item.updateFrequency}}</p>
        </div>
        <p class="name">{{item.name}}</p>
    </div>
</template>

<script>

export default {
    props:{
        item:{
            type:Object
        }
    },
    filters:{
        filterAdd:(index)=>{
            return index+1
        }
    }
}
</script>

<style scoped lang="stylus">
    .surge
      width 31.5%
      margin-bottom .1rem
      position relative
      overflow hidden
      .wrap
        display inline-block
        position relative
      img 
        width 100%
        float left
        border-radius .1rem
      .tag
        position absolute
        color #fff
        bottom .06rem
        left .06rem
        font-size .13rem

</style>