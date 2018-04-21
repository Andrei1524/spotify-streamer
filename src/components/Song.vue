<template>
  <div class="song">
      <div class="song-image">
          <span @click="play"><i class="fas fa-play"></i></span>
      </div>
      <div class="song-info">
          <h3>{{ song.track.name }}</h3>
      </div>
  </div>
</template>

<script>
import { EventBus } from '../event-bus'
export default {
    props: ['song'],
    data() {
        return {
        }
    },
    methods: {
        play() {
            let search = require('youtube-search');
            
            let opts = {
                maxResults: 3,
                key: 'AIzaSyBm0KobFucNxOQYwZdhFG9mcCGIqSgVK-8'
            };
            
            let search_artist_and_name

            if (this.song.track.artists[1]) {
                search_artist_and_name = this.song.track.artists[0].name + " " + this.song.track.artists[1].name + " " + this.song.track.name
            } else {
                search_artist_and_name = this.song.track.artists[0].name + " " + this.song.track.name
            }
            
            search(search_artist_and_name, opts, (err, results) => {
                if(err) return console.log(err);
                // console.log(results[0].id)
                this.$store.dispatch('setCurrentSongId', results[0].id)
                
                //emit an event to play with the current id
                EventBus.$emit('play_song')
            });
        }
    },
}
</script>

<style lang="scss" scoped>
.song {
    display: flex;
    margin: 5px 0;
    width: 280px;
    position: relative;
    height: 50px;
    min-height: 50px;
    &::after {
        content: "";
        position: absolute;
        display: block;
        height: calc(100% - 2px);
        width: calc(100% - 25px);
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        border: 1px solid #e64b4b;
        border-left: 0;
    }
.song-image {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e64b4b;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    min-width: 50px;
    min-height: 50px;
    z-index: 100;
    span {
        display: block;
        color: #FFF;
        cursor: pointer;
        i {
            font-size: 1.6em;
        }
    }
}

.song-info {
        display: flex;
        align-items: center;
        width: 100%;
    h3 {
        margin-left: 10px;
        color: #FFF;
        font-weight: 300;
        padding: 5px 0;
        font-size: 14px;
    }
}
}

</style>
