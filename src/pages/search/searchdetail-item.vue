<template>
    <li :data-id="item.id" @click="playclick">
        <div>
            <p class="name">{{item.name}}</p>
            <p class="detail">{{item.artists[0].name}}{{item.artists[1]?'/'+item.artists[1].name :''}}</p>
        </div>
        <span class="score yo-ico">&#xe61d;</span>
        <span class="score yo-ico">&#xe634;</span>
    </li>
</template>
<script>
import { get } from 'utils/http.js'
export default {
    props:{
        item:{
            type:Object
        }
    },
    created() {
        this.music = {}
    },
    methods: {
        async playclick(){
            let result = await get({
                url:`/api/song/url?id=${this.item.id}`
            })
            this.music.src =`https://music.163.com/song/media/outer/url?id=${this.item.id}.mp3`
            let result2 = await get({
                url:`/api/lyric?id=${this.item.id}`
            })
            this.music.lrc= result2.lrc.lyric
            this.music.title = this.item.name
            this.music.artist = this.item.artists[0].name+(this.item.artists[1]?this.item.artists[1].name :'')
            this.music.pic = this.item.album.artist.picUrl
            this.$store.commit('setMusic',JSON.parse(JSON.stringify(this.music)) )
        }
    },
}
</script>
<style scoped lang="stylus">
@import "~assets/stylus/border.styl"
li 
  display flex
  padding .1rem 0
  width 100%
  align-items center
  $border(0 0 1px 0,#dbdbdb,solid)
  div 
    flex 1
    overflow hidden
    p 
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      width 100%
    .name
      color #4f7baa
      font-size .16rem
    .detail
      color #a5a5a5
      font-size .13rem
  span 
    font-size .2rem
    color #b0b0b0
    flex 0
</style>