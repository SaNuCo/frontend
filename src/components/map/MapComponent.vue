<template>
    <div class="component">
        <div class="map" ref="mapContainer" />
        <div v-if="isLoaded">
            <div v-for="marker, idx in markers" :key="idx">
                <ContentMarkerComponent :map="map" :marker="marker" @markerClicked="updateMarker(marker)">
                </ContentMarkerComponent>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Map, Marker } from "maplibre-gl";
import ContentMarkerComponent from './ContentMarkerComponent.vue';
import { useTheme } from "vuetify/lib/framework.mjs";
import { watch } from "vue";
import { Prop, Watch } from "vue-property-decorator";
import gql from "graphql-tag";

@Options({
    components: {
        ContentMarkerComponent,
    }
})
export default class MapComponent extends Vue {
    declare $refs: {
        mapContainer: any
    }

    map: Map | null = null;

    isLoaded = false

    markers: any[] = []

    theme!: any

    expandedMarker: any | null = null;

    @Prop({ default: false })
    pickerMode!: boolean

    @Prop({ default: null })
    pickerCoordinates!: [number, number] | null

    created() {
        this.theme = useTheme();
    }

    get isDarkMode(): boolean {
        return this.theme.global.name.value == "dark";
    }

    get stylePath(): string {
        return this.isDarkMode ? "/mapstyles/dark/style.json" : "/mapstyles/light/style.json"
    }

    async mounted() {
        const location: [number, number] = [9.174886529310387, 48.772661078848294]
        this.map = new Map({
            container: this.$refs.mapContainer,
            style: this.stylePath,
            center: location,
            zoom: 9,
            maxZoom: 20,
            transformRequest: (url: string) => ({
                url: new URL(url, document.baseURI).toString()
            }),
        }).on("mousedown", this.mapClicked);
        this.isLoaded = true

        if (this.pickerMode) {
            if (this.pickerCoordinates) {
                this.markers.push({
                    coordinates: this.pickerCoordinates ?? location,
                    isContentVisible: false
                })
            }
        } else {
            const data = await this.$apollo.query({
                query: gql`
                    query {
                        foodOfferings {
                            nodes {
                                id
                                title
                                description
                                picture
                                location
                            }
                        }
                    }
                `
            })
            const markers = data.data.foodOfferings.nodes
            for (const marker of markers) {
                this.markers.push({
                    coordinates: marker.location,
                    isContentVisible: false,
                    title: marker.title,
                    img: marker.picture
                })
            }
        }
    }

    @Watch("pickerCoordinates")
    pickerCoordinatesChanged() {
        if (this.markers.length > 0) {
            this.markers[0].coordinates = this.pickerCoordinates
        } else {
            this.markers.push({
                coordinates: this.pickerCoordinates,
                isContentVisible: false
            })
        }
    }

    updateMarker(marker: any) {
        if (this.pickerMode) {
            // nothing
        } else {
            if (marker == this.expandedMarker) {
                // TODO
            } else {
                if (this.expandedMarker) {
                    this.expandedMarker.isContentVisible = false;
                }
                marker.isContentVisible = true
                this.expandedMarker = marker;
            }
        }
    }

    mapClicked(args: any) {
        if (this.pickerMode) {
            const pos = args.lngLat
            this.$emit("pickerUpdated", [pos.lng, pos.lat])
        } else {
            if (this.expandedMarker && !args.originalEvent.defaultPrevented) {
                this.expandedMarker.isContentVisible = false;
                this.expandedMarker = null;
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
    position: relative;
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