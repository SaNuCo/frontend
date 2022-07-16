<template>
    <div>
        <v-btn to="/profile">
            Profile
        </v-btn>
        <v-btn to="/offering">
            Create Offering
        </v-btn>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    
})
export default class HomeView extends Vue {}
</script>

<style scoped>

</style>