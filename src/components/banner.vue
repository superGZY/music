<template>
    <li :data-id="bannerimg.bannerId">
        <img :src="bannerimg.pic"/>
    </li>
</template>

<script>
export default {
    props:{
      bannerimg:{
        type:Object
      }
    }
}
</script>

<style scoped lang="stylus" scoped>
li 
  padding-left .1rem
  padding-right .1rem
  height 0
  width:100%
  padding-bottom 37%
  list-style none
  img 
    width 100%
    border-radius .1rem
.my-bullet-active
  color #fd2f22
</style>