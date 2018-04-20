<template>
  <div>
     <div class="greet">
         <h1>Hello, <span>{{ this.$store.state.user.display_name }}</span></h1>
     </div>
    
    <div class="user-menu_latest-songs-wrapper">
        <app-user-menu></app-user-menu>
        <app-latest-songs></app-latest-songs>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import UserMenu from '../components/UserMenu'
import LatestSongs from '../components/LatestSongs'

export default {
    data() {
        return {
        }
    },
    async mounted() {
        let latest_tracks = await axios.get('https://api.spotify.com/v1/me/tracks', {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.acces_token
                    }
            })
        // this.latest_tracks = latest_tracks.data.items
        this.$store.dispatch('setLatestTracks', latest_tracks.data.items)
    },
    components: {
        'app-user-menu': UserMenu,
        'app-latest-songs': LatestSongs
    }
}
</script>

<style lang="scss">
.greet {
    display: flex;
    justify-content: center;
    padding: 5px 0;
    margin-top: 10px;

    h1 {
        color: #FFF;
        font-size: 24px;
        font-weight: 500;

        > span {
        font-weight: 300;
        }
    }
}

.user-menu_latest-songs-wrapper {
    margin-top: 20px;   
}
</style>
