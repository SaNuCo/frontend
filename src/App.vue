<template>
    <v-app>
        <v-main>
            <router-view />
        </v-main>
        <v-bottom-navigation :value="$route.name" color="primary" v-if="showBottomNavigation">
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
import debounce from "lodash/debounce"
import { useTheme } from 'vuetify/lib/framework.mjs';

@Options({})
export default class App extends Vue {
    route = "home"

    get showBottomNavigation(): boolean {
        return ["/", "/home", "/map", "/discover"].includes(this.$route.path)
    }

    created() {
        const theme = useTheme();
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme && (theme.global.name.value == "light" || theme.global.name.value == "dark")) {
            theme.global.name.value = savedTheme;
        }
    }

    setViewHeight() {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    mounted() {
        this.setViewHeight()
        const debouncedSetHeight = debounce(this.setViewHeight, 50)
        window.addEventListener('resize', debouncedSetHeight)
    }
}
</script>
<style>
html,
body {
    overflow-y: hidden !important;
}

.v-application__wrap {
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
    max-height: 100vh;
    max-height: calc(var(--vh, 1vh) * 100);
}

  .application {
    height: 100%;
  }

  main {
    height: calc(100%);
  }
</style>