<template>
  <div class="login-wrapper">
    <a class="login-btn" href="https://spotify-streamer-api.herokuapp.com/login">log in</a>

    <div class="login-text">
      <span>Sync your liked songs from Spotify and play / download them!</span>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
    data() {
        return {  
        }
    },
  methods: {
  },
  mounted() {
  }
}
</script>

<style lang="scss">
.login-wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  padding: 5px 0;

  .login-btn {
    display: inline-block;
    background: #E27171;
    text-transform: uppercase;
    color: #FFF;
    text-decoration: none;
    font-weight: 300;
    font-size: 22px;
    padding: 10px 20px;
  }

  .login-text {
    margin-top: 10px;
    span {
      display: block;
      font-size: 12px;
      color: #FFF;
      background: #00000066;
      font-weight: 300;
      padding: 5px;
    }
  }
}
</style>
