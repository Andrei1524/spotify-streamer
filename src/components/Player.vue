<template>
  <div class="player" v-if="this.$store.state.current_playing">
      <youtube class="video-player" :video-id="this.$store.state.current_song_id" @ready="ready" :player-vars="{autoplay: 1}"></youtube>
      <div class="player-up">
        <div class="ctrls-sg-name-artist">
          <div class="sg-name-artist">
                <h2>{{ this.$store.state.current_playing.track.name }}</h2>
                <h3>{{ getArtists }}</h3>
          </div>

          <div class="ctrls">
              <span><i class="fas fa-step-backward"></i></span>
              <span><i :class="isPlaying" @click="play_song"></i></span>
              <span><i class="fas fa-step-forward"></i></span>
          </div>
        </div>

        <div class="vlm-rpt-shfl">
            <div class="rpt-shfl">
                <span><i class="fas fa-redo"></i></span>
                <span><i class="fas fa-random"></i></span>
            </div>

            <div class="vlm">
                <span><i class="fas fa-volume-up"></i></span>
                <input type="range" min="0" max="100" step="1" v-model="input_volume" v-on:change="changeVolume" class="vlm-indicator">
            </div>
        </div>
      </div>

      <div class="song-where">
          <span></span>
      </div>
  </div>
</template>

<script>
import { EventBus } from '../event-bus'
export default {
    data() {
        return {
            input_volume: 100
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
            // this.$store.dispatch('setIsPlaying', true)
            if (!this.$store.state.isPlaying) {
                this.player.playVideo()
                this.$store.dispatch('setIsPlaying', true)
            } else {
                this.player.pauseVideo()
                this.$store.dispatch('setIsPlaying', false)
            }
        },
        changeVolume() {
            this.player.setVolume(this.input_volume)
        }
    },
    computed: {
        getArtists() {
            let artists = ""
            this.$store.state.current_playing.track.artists.forEach((artist, index) => {
                if (index < 0) {
                    artists += artist.name
                    
                } else {
                    artists += artist.name + ", "
                }
            })
            return artists
        },
        isPlaying() {
            if (this.$store.state.isPlaying) {
                return {
                    'fa fa-stop': true
                }
            }
            if (!this.$store.state.isPlaying) {
                return {
                    'fa fa-play':  true
                }
            }
        }
    },
    mounted() {
        this.ready()
        EventBus.$on('play_song', () => {
            this.player.playVideo()
            console.log(this.player)
            //this.$store.dispatch('setIsPlaying', true)
        })

        EventBus.$on('stop_song', () => {
            this.player.pauseVideo()
            console.log('stop video')
            //this.$store.dispatch('setIsPlaying', true)
        })
    }
}
</script>

<style lang="scss" scoped>
.video-player {
    height: 50px;

    iframe {
        height: 50px;
    }
}
    .player {
        position: absolute;
        bottom: 10px;
        left: 0;
        width: calc(100% - 20px);
        margin: 0 10px;
        background: #E27171;
        z-index: 1000;
        .player-up {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px;
            .ctrls-sg-name-artist {
                .sg-name-artist {
                    h2 {
                        font-weight: 600;
                        color: #FFF;
                        font-size: 16px;
                    }

                    h3 {
                        font-weight: 700;
                        color: #8a4949;
                        font-size: 14px;
                        margin-top: 0px;
                    }
                }
            }
            .vlm-rpt-shfl {
                .rpt-shfl {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    padding: 5px 0;
                    span {
                        margin-left: 10px;
                        i {
                            font-size: 1.2em;
                            color: #8a4949;
                        }
                    }
                }
                .vlm {
                    display: flex;
                    align-items: center;
                    > span {
                        margin-right: 5px;
                    }
                    input[type=range] {
                        -webkit-appearance: none;
                        width: 100%;
                        margin: 4.7px 0;
                    }

                    input[type=range]:focus {
                        outline: none;
                    }

                    input[type=range]::-webkit-slider-runnable-track {
                        width: 100%;
                        height: 12.6px;
                        cursor: pointer;
                        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
                        background: rgba(0, 0, 0, 0);
                        border-radius: 6.2px;
                        border: 0px solid rgba(0, 0, 0, 0);
                    }

                    input[type=range]::-webkit-slider-thumb {
                        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
                        border: 1px solid #ffffff;
                        height: 22px;
                        width: 22px;
                        border-radius: 50px;
                        background: #e27171;
                        cursor: pointer;
                        -webkit-appearance: none;
                        margin-top: -4.7px;
                    }

                    input[type=range]:focus::-webkit-slider-runnable-track {
                        background: rgba(13, 13, 13, 0);
                    }

                    input[type=range]::-moz-range-track {
                        width: 100%;
                        height: 12.6px;
                        cursor: pointer;
                        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
                        background: rgba(0, 0, 0, 0);
                        border-radius: 6.2px;
                        border: 0px solid rgba(0, 0, 0, 0);
                    }

                    input[type=range]::-moz-range-thumb {
                        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
                        border: 1px solid #ffffff;
                        height: 22px;
                        width: 22px;
                        border-radius: 50px;
                        background: #e27171;
                        cursor: pointer;
                    }

                    input[type=range]::-ms-track {
                        width: 100%;
                        height: 12.6px;
                        cursor: pointer;
                        background: transparent;
                        border-color: transparent;
                        color: transparent;
                    }

                    input[type=range]::-ms-fill-lower {
                        background: rgba(0, 0, 0, 0);
                        border: 0px solid rgba(0, 0, 0, 0);
                        border-radius: 12.4px;
                        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
                    }

                    input[type=range]::-ms-fill-upper {
                        background: rgba(0, 0, 0, 0);
                        border: 0px solid rgba(0, 0, 0, 0);
                        border-radius: 12.4px;
                        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
                    }

                    input[type=range]::-ms-thumb {
                        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
                        border: 1px solid #ffffff;
                        height: 22px;
                        width: 22px;
                        border-radius: 50px;
                        background: #e27171;
                        cursor: pointer;
                        height: 12.6px;
                    }

                    input[type=range]:focus::-ms-fill-lower {
                        background: rgba(0, 0, 0, 0);
                    }

                    input[type=range]:focus::-ms-fill-upper {
                        background: rgba(13, 13, 13, 0);
                    }

                    span:nth-child(1) {
                        i {
                            font-size: 1.4em;
                            color: #8a4949;
                        }
                    }
                    .vlm-indicator {
                        display: block;
                        height: 10px;
                        width: 100px;
                        background: #FFF;
                        margin-left: 5px;
                        border-radius: 10px;
                    }
                }
            }
        }
        .song-where {
            span {
                display: block;
                width: 100%;
                background: #FFF;
                height: 10px;
            }
        }
        .ctrls {
            display: flex;
            align-items: center;
            span {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 35px;
                height: 35px;
                background: #FFF;
                border-radius: 50%;
                cursor: pointer;
                &:nth-child(2) {
                    height: 45px;
                    width: 45px;
                    /* -webkit-box-shadow: 0 0 4px #000000e0; */
                    /* box-shadow: 0 0 4px #000000e0; */
                    z-index: 10;
                    border: 4px solid #e27171;
                    i {
                        font-size: 1.6em;
                    }
                }

                &:nth-child(1) {
                    position: relative;
                    right: -6px;
                    i {
                        color: #e27171;
                    }
                }

                &:nth-child(3) {
                    position: relative;
                    left: -6px;
                    i {
                        color: #e27171;
                    }
                }
                i {
                    font-size: 1.4em;
                    color: #e27171;
                }
            }
        }
    }
</style>
