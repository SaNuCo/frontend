<template>
  <div>
    <!-- Button to add a new offer -->
    <v-btn value="offering" to="/offering">
      <span>Add Offer</span>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <!-- List of all existing offers -->
    <div class="offer__container">
      <div
        class="offer__items"
        v-for="(existingOffer, offerKey) in existingOffers"
        v-bind:key="offerKey"
      >
        {{ existingOffer.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import gql from "graphql-tag";

@Options({
  components: {},
})
export default class OfferComponent extends Vue {
  existingOffers = [
    {
      title: "Tomaten",
      picture: "",
      location: "",
      category: "share",
      description: "Biete Tomaten",
    },
    {
      title: "Ananas",
      picture: "",
      location: "",
      category: "share",
      description: "Biete Tomaten",
    },
    {
      title: "Feta",
      picture: "",
      location: "",
      category: "share",
      description: "Biete Tomaten",
    },
  ];
}
</script>

<style lang="scss">
.offer {
  &__container {
    padding: 2rem;
  }

  &__items {
    padding: 1rem;
    border-bottom: 1px solid lightgray;
  }
}
</style>