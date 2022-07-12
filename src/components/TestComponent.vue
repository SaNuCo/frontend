<template>
    <marker-component
        :contentWidth="200" 
        :contentHeight="200 * 9 / 16" 
        :isContentVisible="showContent" 
        @click="toggleShowContent()" 
        style="width: 200px;" 
        markerFill="blue" 
        markerStroke="darkblue" 
        :identifier="(Math.random() + 1).toString(36).substring(7)"
    >
        <template v-slot:icon>
            <v-icon style="width: 100%; height: 100%" color="white">
                mdi-message-text
            </v-icon>
        </template>
        <template v-slot:content>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg" style="width: 100%"
            />
        </template>
    </marker-component>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MarkerComponent from "@/components/ContentMarkerComponent.vue";

@Options({
    components: {
        MarkerComponent,
    },
})
export default class TestComponent extends Vue {

    showContent = false

    toggleShowContent() {
        this.showContent = !this.showContent
    }
}
</script>

<style scoped>

</style>