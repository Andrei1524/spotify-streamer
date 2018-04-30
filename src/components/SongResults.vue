<template>
        <div class="song" :data-songid="song.track.id">
            <div class="song-info">
                <h3 @click="play">{{ result.title }}</h3>

                <div class="info">
                    <span @click="download">
                        <i class="fas fa-download"></i>
                    </span>
                </div>
            </div>
        </div>
</template>

<script>
import { EventBus } from '../event-bus'

export default {
    props: ['result','song'],
    data() {
        return {
            isSongPlaying: false,
            results: undefined
        }
    },
    methods: {
        async play() {
            console.log(this.result)      
            let searchPromise = new Promise((resolve, reject) => {
                this.$store.dispatch('setCurrentSongId', this.result.id)
                    //set current_playing_song
                this.$store.dispatch('setCurrentPlayingSong', this.song)
                resolve()
            })
            
            searchPromise.then(async () => {
                await EventBus.$emit('play_song')
                this.$store.dispatch('setIsPlaying', true)
            })
            
        },
        download() {
            let songToDownload = undefined

            songToDownload = this.result
            console.log(songToDownload)
            
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
    }
}
</script>

<style lang="scss" scoped>

.song {
    display: flex;
    margin: 5px 0;
    width: 100%;
    position: relative;
    height: 20px;
    min-height: 20px;
    background: linear-gradient(to right, #e64b4b5c, #e2717114);


.song-info {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        padding-right: 5px;
        .info {
            display: flex;

            > span {
                i {
                    font-size: 0.5em;
                }
            }
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
            color: #ffffffde;
            font-weight: 300;
            padding: 5px 0;
            font-size: 10px;
            cursor: pointer;
            &:hover {
                color: #FFF;
            }
        }
    }
}



</style>
