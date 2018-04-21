<template>
  <div class="latest-songs">
      <app-song v-for="song in this.$store.state.latest_tracks" v-bind:key="song.track.id" :song="song"></app-song>
      <youtube :video-id="this.$store.state.current_song_id" @ready="ready"></youtube>
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
        ready(player) {
            this.player = player
        },
        playing(player) {
            // The player is playing a video.
        },
        change() {
            // when you change the value, the player will also change.
            // If you would like to change `playerVars`, please change it before you change `videoId`.
            // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
            // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
        },
        stop() {
            this.player.stopVideo()
        },
        pause() {
            this.player.pauseVideo()
        },
        play_song() {
            this.player.playVideo()
        }
    },
    mounted() {
        EventBus.$on('play_song', () => {
            this.play_song()
        })
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
