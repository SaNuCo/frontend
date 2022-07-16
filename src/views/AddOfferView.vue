<template>
  <AddOfferComponent />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AddOfferComponent from "@/components/home/AddOfferComponent.vue";

@Options({
  components: {
    AddOfferComponent,
  },
})
export default class AddOfferView extends Vue {}
</script>

<style scoped>
</style>