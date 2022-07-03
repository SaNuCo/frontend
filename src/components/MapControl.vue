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
export default class MapControl extends Vue {
    declare $refs: {
        mapContainer: any
    }
    
    private map!: Map;

    mounted() {
        console.log(this.$refs.mapContainer)
        this.map = new Map({
            container: this.$refs.mapContainer,
            style: "/map/light/style.json",
            center: [-74.5, 40],
            zoom: 9,
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