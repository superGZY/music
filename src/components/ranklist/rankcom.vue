<template>
    <div class="surge">
            <img :src="item.coverImgUrl"/>
            <p class="tag">{{item.updateFrequency}}</p>
            <ul>
                <li 
                v-for="(obj,index) in item.tracks"
                :key="index"
                >{{index|filterAdd}}.{{obj.first}}-{{obj.second}}</li>
            </ul>
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
      width 100%
      margin-bottom .1rem
      display flex
      align-items center
      position relative
      img 
        width 31.5%
        height 100%
        float left
        border-radius 10%
      .tag
        position absolute
        color #fff
        bottom .06rem
        left .06rem
      ul 
        width 68.5%
        display flex
        flex-direction column
        justify-content: space-around
        color gray  
        padding .1rem 0 .1rem .14rem
        li 
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          width 100%
</style>