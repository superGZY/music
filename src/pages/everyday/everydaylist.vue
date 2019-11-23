<template>
    <li >
        <img :src="item.album.picUrl"/>
        <div class="box">
            <p class="name">{{item.name}}</p>
            <p class="name"></p>
        </div>
        <i class="yo-ico">&#xe634;</i>
    </li>
</template>
<script>

export default {
    props:{
        item:{
            type:Object
        }
    }
}
</script>

<style scoped lang="stylus">
li 
  margin .1rem 0
  display flex
  img 
    width .4rem
    height .4rem
    border-radius .04rem
    margin-right .1rem
  .box
    flex 1
</style>