<template>
  <div class="home">
    <header>
      <h1 class="app-name">Spotify-Streamer</h1>
      <a href="#"><i class="fab fa-github-square fa-2x github-ico"></i></a>
    </header>
    <app-login v-if="!this.$store.state.user"></app-login>
    <app-user v-if="this.$store.state.user"></app-user>
    <footer>
      <div class="owners">
          <a href="https://unsplash.com/photos/VKMx4lonuLg">image</a>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
import Login from '../components/Login'
import User from '../views/User'
// @ is an alias to /src


export default {
    data() {
        return {  
        }
    },
  methods: {
    async getUser() {
       const user = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                  'Authorization': 'Bearer ' + this.$store.state.acces_token
                }
        })
        // set user in store
        this.$store.dispatch('setUserDetails', user.data)
    }
  },
  created() {
        // console.log(this.$route.path.split("&")[1])
        // if we see the token in the url
      if (this.$route.path.split("&")[1] !== undefined) {
            const token = this.$route.path.split("&")[1].split("=")[1]
            this.$store.dispatch('setAccesToken', token)

            this.getUser()
      }
      
  },
  components: {
      'app-login': Login,
      'app-user': User
  }
}
</script>

<style lang="scss">
/* ========================*/

#app {
  padding: 0 5px;

  header {
    padding: 5px 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid white;

    .github-ico {
      color: #FFF;
    }
  }



  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 5px;
    width: calc(100% - 10px);
    .owners {
      display: inline-block;
      a {
        display: block;
        text-decoration: none;
        color: #fff9;
        font-weight: 300;
        font-size: 12px;
      }
    }
  }
}
.app-name {
  font-size: 32px;
  color: #FFF;
}
</style>

