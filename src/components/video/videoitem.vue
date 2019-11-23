<template>
    <div class="wrap" :data-id="item.id" @click="tovideoplay(item.id)">
        <img :src="item.cover"/>
        <div class="name">{{item.name}}--{{item.artistName}}</div>
    </div>
</template>

<script>
export default {
    props:{
        item:{
            type:Object
        }
    },
    methods: {
        tovideoplay(id){
            this.$router.push('/videoplay/'+id)
        }
    },
}
</script>

<style scoped lang="stylus">
@import '~assets/stylus/border.styl';
.wrap
  width 48%
  margin-bottom .1rem
  img 
    width 100%
    height 60%
    border-radius .1rem
  .name
    font-size .15rem
    padding-top .1rem
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
</style>