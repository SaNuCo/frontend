<template>
    <div>
        <marker-component :contentWidth="400" :contentHeight="400" :isContentVisible="showContent">
            <template v-slot:icon>
                <v-icon style="width: 100%; height: 100%" color="white">
                    mdi-message-text
                </v-icon>
            </template>
            <template v-slot:content>
                <img
                    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                />
            </template>
        </marker-component>
        <v-btn @click="toggleShowContent()"/>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import MarkerComponent from "@/components/MarkerComponent.vue";

@Options({
    components: {
        MarkerComponent,
    },
})
export default class TestView extends Vue {

    showContent = false

    toggleShowContent() {
        this.showContent = !this.showContent
    }
}
</script>

<style scoped>
.view {
    width: 100%;
    height: 100%;
}

</style>