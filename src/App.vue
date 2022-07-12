<template>
    <v-app>
        <v-main>
            <router-view/>
        </v-main>
        <v-bottom-navigation
            :value="$route.name"
            color="primary"
        >
            <v-btn value="discover" to="/discover">
                <span>Discover</span>
                <v-icon>mdi-map-marker</v-icon>
            </v-btn>
            <v-btn value="home" to="/">
                <span>Home</span>
                <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-btn value="map" to="/map">
                <span>Map</span>
                <v-icon>mdi-map-marker</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({})
export default class App extends Vue {
    route = "home"
}
</script>
<style>
html,body {
    overflow-y: hidden !important;
}
</style>