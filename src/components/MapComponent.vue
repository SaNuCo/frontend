<template>
    <div class="component">
        <div class="map" ref="mapContainer" />
        <div v-if="isLoaded">
            <div v-for="coordinate, idx in coordinates" :key="idx">
                <MarkerComponent :lngLat="coordinate" :map="map" anchor="bottom">
                    <TestComponent></TestComponent>
                </MarkerComponent>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Provide, ProvideReactive } from "vue-property-decorator";
import { Map } from "maplibre-gl";
import TestComponent from './TestComponent.vue';
import MarkerComponent from './MarkerComponent.vue';

@Options({
    components: {
        TestComponent,
        MarkerComponent
    }
})
export default class MapComponent extends Vue {
    declare $refs: {
        mapContainer: any
    }
    
    map: Map | null = null;

    isLoaded = false

    get coordinates(): any {
        const res: [number, number][] = []
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                res.push([9.174886529310387 + i, 48.772661078848294 + j])
            }
        }
        return res
    }

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
    z-index: 1;
}
</style>