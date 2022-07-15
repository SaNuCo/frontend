<template>
  <div>
    <!-- Button to add a new offer -->
    <v-btn value="add" to="/add">
      <span>Add Offer</span>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <!-- List of all existing offers -->
    <div class="offer__container">
      <!-- TODO: durch gegebene Angebote loopen, Bilder und Name rendern -->
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class OfferComponent extends Vue {}
</script>

<style lang="scss">
.offer {
  &__container {
    padding: 2rem;
  }
}
</style>