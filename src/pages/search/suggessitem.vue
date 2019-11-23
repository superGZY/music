<template>
    <li  @click="handleClick(sussgess.keyword)">
        <i class="yo-ico">&#xe61a;</i>
        {{sussgess.keyword}}
    </li>
</template>

<script>
export default {
    props:{
        sussgess:{
            type:Object
        }
    },
    methods: {
        handleClick(data){
            this.$router.push('/searchdetail/'+data)
        }
    }
}
</script>

<style scoped lang="stylus">
li 
  height .44rem
  line-height .44rem
  color #4c4c4d
  i 
    color #b5b7ba
    font-size .16rem
</style>