<template>
  <div class="component">
    <profile-component />
    <offer-component />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ProfileComponent from "./ProfileComponent.vue";
import OfferComponent from "./OfferComponent.vue";

@Options({
  components: {
    ProfileComponent,
    OfferComponent,
  },
})
export default class HomeComponent extends Vue {}
</script>

<style scoped>
@import "~maplibre-gl/dist/maplibre-gl.css";

.component {
  width: 100%;
  height: 100%;
}
</style>
