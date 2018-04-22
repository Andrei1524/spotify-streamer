<template>
  <div class="latest-songs">
      <app-song v-for="song in this.$store.state.latest_tracks" v-bind:key="song.track.id" :song="song"></app-song>
  </div>
</template>

<script>
import Song from './Song'
import { EventBus } from '../event-bus'
export default {
    data() {
        return {
        }
    },
    methods: {
    },
    components: {
        'app-song': Song
    }
}
</script>

<style lang="scss" scoped>
    .latest-songs {
        display: flex;
        flex-direction: column;
        background: #00000024;
        padding: 5px;
        height: 380px;
        overflow: auto;
    }
</style>
