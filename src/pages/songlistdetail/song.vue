<template>
<div>
    <aplayer autoplay
    :music="$store.state.music"
    :float="true"
    :showLrc="true"
    :listFolded="true"
    />
    </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
export default {
    components:{
        Aplayer
    }
}
</script>
<style scoped lang="stylus">
</style>