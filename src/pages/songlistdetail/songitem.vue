<template>
    <li class="liwrap" :data-id="item.id" @click = "handleClick">
        <span>{{index | addfilter}}</span>
        <div>
            <p class="name">{{item.name}}</p>
            <p class="detail">{{item.ar[0].name}}-{{item.name}}</p>
        </div>
        <i class="yo-ico">&#xe634;</i>
    </li>
</template>

<script>
export default {
    props:{
        item:{
            type:Object
        },
        index:{
            type:Number
        }
    },
    filters:{
        addfilter:function(value){
            return value+1
        }
    },
    methods: {
        async handleClick(){
            this.$emit('func',this.item)
        }
    },
}
</script>

<style scoped lang="stylus">
.liwrap
  width 100%
  height .7rem
  display flex
  align-items center
  justify-content center
  padding 0 .2rem
  justify-content space-between
  color #b9b9b9
  font-size .18rem
  div 
    flex 1
    text-align left
    margin-left .2rem
    .name
      color #000
    .detail
      font-size .14rem
  i 
    font-size .24rem
</style>