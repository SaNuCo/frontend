<template>
    <div class="component">
        <div class="map" ref="mapContainer" />
        <div v-if="isLoaded">
            <div v-for="marker, idx in markers" :key="idx">
                <MarkerComponent :lngLat="marker.coordinates" :map="map"
                    :zIndex="marker.isContentVisible ? 0 : 1" :contentWidth="200" :contentHeight="200 * 9 / 16"
                    :isContentVisible="marker.isContentVisible"
                    @click="marker.isContentVisible = !marker.isContentVisible" style="width: 200px;" markerFill="blue"
                    markerStroke="darkblue" :identifier="(Math.random() + 1).toString(36).substring(7)">
                    <template v-slot:icon>
                        <v-icon style="width: 100%; height: 100%" color="white">
                            mdi-message-text
                        </v-icon>
                    </template>
                    <template v-slot:content>
                        <img :src="marker.img" style="width: 100%" />
                    </template>
                </MarkerComponent>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Provide, ProvideReactive } from "vue-property-decorator";
import { Map } from "maplibre-gl";
import MarkerComponent from './MarkerComponent.vue';

@Options({
    components: {
        MarkerComponent,
    }
})
export default class MapComponent extends Vue {
    declare $refs: {
        mapContainer: any
    }

    map: Map | null = null;

    isLoaded = false

    markers: any[] = []

    async mounted() {
        this.map = new Map({
            container: this.$refs.mapContainer,
            style: "/map/light/style.json",
            center: [9.174886529310387, 48.772661078848294],
            zoom: 9,
            maxZoom: 16,
            transformRequest: (url: string) => ({
                url: new URL(url, document.baseURI).toString()
            }),
        });
        this.isLoaded = true

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                this.markers.push({
                    coordinates: [9.174886529310387 + i, 48.772661078848294 + j],
                    isContentVisible: false,
                    img: "https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg"
                })
            }
        }
    }
}
</script>

<style scoped>
@import '~maplibre-gl/dist/maplibre-gl.css';

.component {
    width: 100%;
    height: 100%;
}

.map {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
<style>
.maplibregl-marker {
    pointer-events: none;
}
</style>