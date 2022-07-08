<template>
    <div class="component">
        <div class="map" ref="mapContainer" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Map } from "maplibre-gl";
import { Component } from "@vue/runtime-core";

@Options({})
export default class MapComponent extends Vue {
    declare $refs: {
        mapContainer: any
    }
    
    private map!: Map;

    mounted() {
        this.map = new Map({
            container: this.$refs.mapContainer,
            style: "/map/light/style.json",
            center: [9.174886529310387, 48.772661078848294],
            zoom: 9,
            transformRequest: (url: string) => ({
                url: new URL(url, document.baseURI).toString()
            })
        });
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
</style>>