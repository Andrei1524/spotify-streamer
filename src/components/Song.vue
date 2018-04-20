<template>
  <div @click="play">
      {{song.track.name}}
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
            
            
            console.log(search_artist_and_name)
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

</style>
