<template>
    <div class="song-wrapper">
        <div class="song" :data-songid="song.track.id">
            <div class="song-image" @click="play">
                <span>
                    <i :class="isPlaying"></i>
                </span>
            </div>
            <div class="song-info">
                <h3>{{ song.track.name }}</h3>

                <div class="info">
                    <span class="info-results" @click="show_results = !show_results">
                        <i class="fas fa-music"></i>
                        <span class="results-text">results</span>
                    </span>
                    <span @click="download">
                        <i class="fas fa-download"></i>
                    </span>
                </div>
            </div>
        </div>
        <app-results-chooser v-if="show_results" :results="results" :song="song"></app-results-chooser>
    </div>
</template>

<script>
import { EventBus } from '../event-bus'
let search = require('youtube-search')
import ResultsChooser from './ResultsChooser'

let opts = {
    maxResults: 4,
    key: 'AIzaSyBm0KobFucNxOQYwZdhFG9mcCGIqSgVK-8'
};

export default {
    props: ['song'],
    data() {
        return {
            isSongPlaying: false,
            results: undefined,
            show_results: false
        }
    },
    methods: {
        async play() {
            let search_artist_and_name

            if (this.song.track.artists[1]) {
                search_artist_and_name = this.song.track.artists[0].name + " " + this.song.track.artists[1].name + " " + this.song.track.name
            } else {
                search_artist_and_name = this.song.track.artists[0].name + " " + this.song.track.name
            }
            
            let searchPromise = new Promise((resolve, reject) => {
                search(search_artist_and_name, opts, (err, results) => {
                    if (err) return console.log(err);
                    // console.log(results[0].id)
                    this.results = results
                    this.$store.dispatch('setCurrentSongId', results[0].id)
                    //set current_playing_song
                    this.$store.dispatch('setCurrentPlayingSong', this.song)
                    //emit an event to play with the current id
                })
                resolve()
            })
            
            searchPromise.then(async () => {
                if (this.song.track.id === this.$store.state.current_playing.track.id) {
                    if (!this.$store.state.isPlaying) {
                        await this.$store.dispatch('setIsPlaying', true)
                        EventBus.$emit('play_song')
                    } else {
                        await this.$store.dispatch('setIsPlaying', false)
                        EventBus.$emit('stop_song')
                    }
                } else {
                    await this.$store.dispatch('setIsPlaying', true)
                    
                }
            })
            
        },
        download() {
            let search_artist_and_name
            let songToDownload = undefined

            if (this.song.track.artists[1]) {
                search_artist_and_name = this.song.track.artists[0].name + " " + this.song.track.artists[1].name + " " + this.song.track.name
            } else {
                search_artist_and_name = this.song.track.artists[0].name + " " + this.song.track.name
            }

            let searchYoutubePromise = new Promise((resolve, reject) => {
                search(search_artist_and_name, opts, (err, results) => {
                    if (err) {
                        reject()
                        return console.log(err);
                    }

                    songToDownload = results[0]
                    console.log(results)
                    console.log(search_artist_and_name)
                    resolve()
                })
            })
            
            searchYoutubePromise.then(() => {
                console.log(songToDownload)
            })
            
        }
    },
    computed: {
        isPlaying() {
            if (this.$store.state.current_playing && this.$store.state.isPlaying) {
                if (this.song.track.id === this.$store.state.current_playing.track.id) {
                    return {
                        'fa fa-stop': true
                    }
                }
                if (this.song.track.id !== this.$store.state.current_playing.track.id) {
                    return {
                        'fa fa-play': true
                    }
                }
            } else {
                return {
                    'fa fa-play': true
                }
            }

        }
    },
    mounted() {
    },
    components: {
        'app-results-chooser': ResultsChooser
    }
}
</script>

<style lang="scss" scoped>
.song-wrapper {
    position: relative;
    width: 340px;
    margin-bottom: 10px;
    &::after {
        content: "";
        position: absolute;
        display: block;
        height: calc(100% - 2px);
        width: calc(100% - 25px);
        right: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        border: 1px solid #e64b4b;
    }

    .song {
    display: flex;
    margin: 5px 0;
    width: 100%;
    position: relative;
    height: 50px;
    min-height: 50px;
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
    cursor: pointer;

    &:hover {
        background: #ea6161;
    }
    span {
        display: block;
        color: #FFF;
        i {
            font-size: 1.6em;
        }
    }
}

.song-info {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        padding-right: 5px;
        .info {
            display: flex;
            .info-results {
                display: flex;
                flex-direction: column;
                > span {
                    font-size: 10px;
                }
            }
            > span {
                display: flex;
                align-items: center;
                justify-content: center;
                background: #e27171;
                padding: 5px 8px;
                color: #FFF;
                border: 1px solid #e64b4b;
                position: relative;
                z-index: 1000;
                margin-left: 5px;
                cursor: pointer;

                &:hover {
                    background: #ea8080;
                }
            }
        }
        h3 {
            margin-left: 10px;
            color: #FFF;
            font-weight: 300;
            padding: 5px 0;
            font-size: 14px;
        }
    }
}
}



</style>
