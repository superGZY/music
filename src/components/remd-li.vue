<template>
    <div class="wrap">
        <a class="remd_li" :data-id="song.id" @click="handleClick">
            <div class="remd_img">
                <img :src="song.picUrl" >
            </div>
            <p class="remd-text">{{song.name}}</p>
        </a>
        <div class="bottom" v-if="type==='recomd'">
            <a class="yo-ico f-fr" title="播放" href="javascript:;">&#xe600;</a>
            <span class="nb">{{Math.ceil(song.playCount/10000)}}万</span>
            <span class="yo-ico">&#xe601;</span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        song:{
            type:Object
        },
        type:{
            type:String
        }
    },
    methods: {
        handleClick(){
            console.log(this.song.id)
            this.$router.push({
                name:'songlistdetail',
                params:{"id":this.song.id}
            })
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" scoped>
.wrap
    display flex
    width 32%
    position relative
    .remd_li
      display block
      width 100%
      margin-bottom .1rem
      .remd_img
        width 100%
        height 0
        padding-bottom 100%
        box-sizing content-box
        img
          width 100%
          border-radius .04rem
      .remd-text
          color #333
          font-size .13rem
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
.bottom 
  position: absolute;
  line-height 27px
  top: 0;
  left: 0;
  width: 100%;
  height: 27px;
  background :rgba(0,0,0,0.5)
  color: #ccc;
  padding 0 .1rem
  .icon-headset
    float: left;
    width: 14px;
    height: 11px;
    background-position: 0 -24px;
    margin: 9px 5px 9px 10px;
  .nb
    float: left;
    font-size .12rem
  a 
    float right 
    color #fff
    opacity .6
</style>
