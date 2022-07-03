<template>
    <map-control />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import MapControl from "@/components/MapControl.vue";

@Options({
    components: {
        MapControl,
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