<template>
    <map-component />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import MapComponent from "@/components/map/MapComponent.vue";

@Options({
    components: {
        MapComponent,
    },
})
export default class MapView extends Vue {}
</script>

<style scoped>
.view {
    width: 100%;
    height: 100%;
}
</style>