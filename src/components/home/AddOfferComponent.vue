<template>
  <!-- Header to go back to home view -->
  <div class="add-offer__header">
    <v-btn class="add-offer__header--button" @click="goBack()">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <span class="add-offer__header--title">Add New Offer</span>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class AddOfferComponent extends Vue {
  goBack() {
    router.go(-1);
  }
}
</script>

<style lang="scss" scoped>
.add-offer {
  &__header {
    display: grid;
    grid-template-columns: max-content auto;

    &--title {
      justify-self: center;
      align-self: center;
    }
  }
}
</style>