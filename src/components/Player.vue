<template>
  <div class="player" v-if="this.$store.state.current_playing">
      <youtube class="video-player" :video-id="this.$store.state.current_song_id" @ready="ready" :player-vars="{autoplay: 1}" @ended="ended" @playing="playing"></youtube>
      <div class="player-up">
        <div class="ctrls-sg-name-artist">
          <div class="sg-name-artist">
                <h2>{{ this.$store.state.current_playing.track.name }}</h2>
                <h3>{{ getArtists }}</h3>
          </div>

          <div class="ctrls">
              <span @click="previousSong"><i class="fas fa-step-backward"></i></span>
              <span @click="play_song"><i :class="isPlaying"></i></span>
              <span @click="nextSong"><i class="fas fa-step-forward"></i></span>
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
          <input type="range" min="0" max="100" step="1" :value="player_duration" @change="changeDuration" :style="range_gr">
      </div>
  </div>
</template>

<script>
import { EventBus } from '../event-bus'
import moment from 'moment'
export default {
    data() {
        return {
            input_volume: 100,
            player_duration: 0,
            player_length_no_format_ms: undefined
        }
    },
    methods: {
        ready(player) {
            this.player = player
        },
        playing(player) {
            // The player is playing a video.
            console.log(player.getDuration())
            console.log(player.getCurrentTime())


                setInterval(async () => {
                    let ms = this.player.getCurrentTime()
                    let mom
                    let seconds = new Date(ms).getTime()
                    let secondsPassed = moment('1900-01-01 00:00:00').add(seconds, 'seconds').format('m:ss')
                    // this.player.setVolume(this.player_volume)
                    let videoLengthMs = this.player.getDuration()
                    let videoLength = this.player.getDuration() - seconds
                    let videoLengthSeconds = moment('1900-01-01 00:00:00').add(videoLength, 'seconds').format('m:ss')
                    let line_percentage = Math.round((ms / videoLengthMs) * 100)
                    
                    this.player_length_no_format_ms = videoLengthMs
                    this.player_duration = line_percentage
                }, 1000)
        },
        change() {
            // when you change the value, the player will also change.
            // If you would like to change `playerVars`, please change it before you change `videoId`.
            // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
            // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
        },
        ended() {
            this.nextSong()
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
        changeVolume(e) {
            this.player.setVolume(this.input_volume)
        },
        changeDuration(e) {
            // this.player.pauseVideo()
            this.player_duration = e.target.value
            this.player.seekTo(this.player_length_no_format_ms * (e.target.value / 100))
        },
        nextSong() {
            // find the current playing song id
            let currentSongIndex

            this.$store.state.latest_tracks.forEach((track, index) => {
                if (track.track.id === this.$store.state.current_playing.track.id) {
                    currentSongIndex = index
                    return
                }
            })

            let search = require('youtube-search');

            let opts = {
                maxResults: 3,
                key: 'AIzaSyBm0KobFucNxOQYwZdhFG9mcCGIqSgVK-8'
            };

            // next artist
            if (this.$store.state.current_playing.track.id === this.$store.state.latest_tracks[this.$store.state.latest_tracks.length - 1].track.id) {
                currentSongIndex = 0
            } else {
                currentSongIndex++
            }

            let nextSong = this.$store.state.latest_tracks[currentSongIndex]
            //search this song by name and an artist
            let searchNextSong = nextSong.track.name + " " + nextSong.track.artists[0].name

            search(searchNextSong, opts, (err, results) => {
                if (err) return console.log(err);

                this.$store.dispatch('setCurrentSongId', results[0].id)

                this.$store.dispatch('setCurrentPlayingSong', nextSong)
            })
            this.$store.dispatch('setIsPlaying', true)
        },
        previousSong() {
                        // find the current playing song id
            let currentSongIndex

            this.$store.state.latest_tracks.forEach((track, index) => {
                if (track.track.id === this.$store.state.current_playing.track.id) {
                    currentSongIndex = index
                    return
                }
            })

            let search = require('youtube-search');

            let opts = {
                maxResults: 3,
                key: 'AIzaSyBm0KobFucNxOQYwZdhFG9mcCGIqSgVK-8'
            };

            // previous artist
            if (this.$store.state.current_playing.track.id === this.$store.state.latest_tracks[0].track.id) {
                currentSongIndex = this.$store.state.latest_tracks.length - 1
            } else {
                currentSongIndex--
            }

            let nextSong = this.$store.state.latest_tracks[currentSongIndex]
            //search this song by name and an artist
            let searchNextSong = nextSong.track.name + " " + nextSong.track.artists[0].name

            search(searchNextSong, opts, (err, results) => {
                if (err) return console.log(err);

                this.$store.dispatch('setCurrentSongId', results[0].id)

                this.$store.dispatch('setCurrentPlayingSong', nextSong)
            })
            this.$store.dispatch('setIsPlaying', true)
        }
    },
    computed: {
        getArtists() {
            let artists = ""
            this.$store.state.current_playing.track.artists.forEach((artist, index) => {
                if (index < 0) {
                    artists += artist.name
                    
                } else {
                    artists += artist.name + " "
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
        },
        range_gr() {
            return {
                'background': 'linear-gradient(to right, #ffffff '+ this.player_duration + '%,#ffffff '+ this.player_duration + '%,#ffffff '+ this.player_duration + '%,#ffffff '+ this.player_duration + '%,#4f7993 '+ this.player_duration + '%,#a75252 '+ this.player_duration + '%)'
            }
        }
    },
    mounted() {
        this.ready()
        EventBus.$on('play_song', () => {
            this.player.playVideo()
            //this.$store.dispatch('setIsPlaying', true)
        })

        EventBus.$on('stop_song', () => {
            this.player.pauseVideo()
            //this.$store.dispatch('setIsPlaying', true)
        })
    }
}
</script>

<style lang="scss" scoped>
.video-player {
    height: 50px;
    display: none;
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
            input {
                display: block;
                width: 100%;
                // background: #FFF;
                height: 10px;
                margin: 0;
            }

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  margin: 0px 0;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 0px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0);
  border-radius: 0px;
}
input[type=range]::-webkit-slider-thumb {
  height: 0px;
  width: 0px;
  border-radius: 0px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -0.7px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: rgba(92, 92, 92, 0);
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 32px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0);
  border-radius: 0px;
}
input[type=range]::-moz-range-thumb {
  height: 0px;
  width: 0px;
  border-radius: 0px;
  background: #ffffff;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 32px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: rgba(0, 0, 0, 0);
  border-radius: 0px;
}
input[type=range]::-ms-fill-upper {
  background: rgba(0, 0, 0, 0);
  border-radius: 0px;
}
input[type=range]::-ms-thumb {
  width: 0px;
  border-radius: 0px;
  background: #ffffff;
  cursor: pointer;
  height: 0px;
}
input[type=range]:focus::-ms-fill-lower {
  background: rgba(0, 0, 0, 0);
}
input[type=range]:focus::-ms-fill-upper {
  background: rgba(92, 92, 92, 0);
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
