<template>
  <div class="profile__container">
    <ProfileAvatar class="profile__image" username="Test User"></ProfileAvatar>
    <span class="profile__description">Name des Users</span>
    <span class="profile__description">Kurze Beschreibung des Users</span>
    <span class="profile__description">Erfahrung des Users</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ProfileAvatar from "vue-profile-avatar";

@Options({
  components: {
    ProfileAvatar,
  },
})
export default class ProfileComponent extends Vue {}
</script>

<style lang="scss" scoped>
.profile {
  &__container {
    display: grid;
    grid-template-columns: max-content auto;
    grid-template-rows: auto auto auto;

    padding: 2rem;
  }

  &__image {
    grid-column: 1;
    grid-row-start: 1;
    grid-row-end: 4;

    align-self: center;
  }

  &__description {
    grid-column: 2;
    padding-left: 2rem;
  }
}
</style>