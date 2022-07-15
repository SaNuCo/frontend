<template>
    <div>
        <v-btn @click="toggleDarkMode()">
            Toggle dark mode
        </v-btn>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useTheme } from "vuetify/lib/framework.mjs";

@Options({})
export default class Test extends Vue {

    theme!: any

    created() {
        this.theme = useTheme();
    }

    toggleDarkMode() {
        const newTheme = this.theme.global.current.value.dark ? 'light' : 'dark';
        this.theme.global.name.value  = newTheme;
        localStorage.setItem("theme", newTheme);
    }
}
</script>
<script>

</script>


<style>
</style>