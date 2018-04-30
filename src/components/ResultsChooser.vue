<template>
    <div class="results">
        <app-song-results v-if="results" v-for="result in results" v-bind:key="result.id" :song="song" :result="result"></app-song-results>
        <p v-if="!results">Click play first so the results fetches!</p>
    </div>
</template>

<script>
import {EventBus } from '../event-bus'
import SongResults from './SongResults'
export default {
    props: ['results', 'song'],
    data() {
        return {
        }
    },
    methods: {
    },
    created() {
        console.log(this.results)
    },
    components: {
        'app-song-results': SongResults
    }
}
</script>

<style lang="scss" scoped>
.results {
    display: flex;
    flex-direction: column;
    margin: 5px 0;
    width: 100%;
    position: relative;
    padding-left: 24px;
    box-sizing: border-box;
    z-index: 9999;
    span {
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        font-size: 12px;
        white-space: nowrap;
        cursor: pointer;
        font-weight: 300;
        padding: 5px;
        margin-bottom: 5px;
        color: #ffffffad;
        background: linear-gradient(to left, #e27171, #e64b4b);
        box-sizing: border-box;

        &:hover {
            color: #FFF;
        }
    }
}
</style>
