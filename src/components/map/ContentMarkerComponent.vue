<template>
    <MarkerComponent @markerClicked="$emit('markerClicked')" :lngLat="marker.coordinates" :map="map" ref="markerComponents" :zIndex="marker.isContentVisible ? 1 : 0"
        :contentWidth="200" :contentHeight="200 * 9 / 16" :isContentVisible="marker.isContentVisible"
        style="width: 200px;" markerFill="blue" markerStroke="darkblue"
        :identifier="`${marker.coordinates[0]}-${marker.coordinates[1]}`">
        <template v-slot:icon>
            <v-icon style="width: 100%; height: 100%" color="white">
                mdi-message-text
            </v-icon>
        </template>
        <template v-slot:content>
            <img :src="marker.img" style="width: 100%" />
        </template>
    </MarkerComponent>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Provide, ProvideReactive, Watch } from "vue-property-decorator";
import { Map } from "maplibre-gl";
import MarkerComponent from './MarkerComponent.vue';

@Options({
    components: {
        MarkerComponent,
    }
})
export default class ContentMarkerComponent extends Vue {
    @Prop()
    marker: any
    @Prop()
    map: any
}
</script>

<style>
</style>