<template>
  <home-component />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HomeComponent from "@/components/home/HomeComponent.vue";

@Options({
  components: {
    HomeComponent,
  },
})
export default class HomeView extends Vue {}
</script>

<style scoped>
</style>