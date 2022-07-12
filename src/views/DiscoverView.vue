<template>
    <DiscoverComponent />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DiscoverComponent from "@/components/discover/DiscoverComponent.vue"; 

@Options({
    components: {
        DiscoverComponent
    }
})
export default class DiscoverView extends Vue {}
</script>

<style scoped>

</style>