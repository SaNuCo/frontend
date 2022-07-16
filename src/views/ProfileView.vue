<template>
    <DialogViewComponent name="Profile">
        <template #default>
            <div style="background: green; height: 100%; width: 100%"></div>
        </template>
        <template #header>
            <v-btn icon @click="toggleDarkMode()" :color="iconModeColor">
                <v-icon>{{ iconModeMDI }}</v-icon>
            </v-btn>
        </template>
    </DialogViewComponent>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useTheme } from "vuetify/lib/framework.mjs";
import DialogViewComponent from "@/components/DialogViewComponent.vue";

@Options({
    components: {
        DialogViewComponent
    }
})
export default class ProfileView extends Vue {

    theme!: any

    get isDarkMode(): boolean {
        return this.theme.global.name.value == "dark";
    }

    created() {
        this.theme = useTheme();
    }

    toggleDarkMode() {
        const newTheme = this.theme.global.current.value.dark ? 'light' : 'dark';
        this.theme.global.name.value = newTheme;
        localStorage.setItem("theme", newTheme);
    }

    /**
         * Getter for the BrainLib logo
         */
    get logo(): string {
        return this.isDarkMode
            ? "BrainLibLogoDark.svg"
            : "BrainLibLogo.svg";
    }

    /**
     * Getter for the darkmode/lightmode button color
     */
    get iconModeColor(): string {
        return this.isDarkMode ? "orange" : "accent";
    }

    /**
     * Getter for the icon of the darkmode/lightmode toggle button
     */
    get iconModeMDI(): string {
        return this.isDarkMode
            ? "mdi-weather-sunny"
            : "mdi-weather-night";
    }
}
</script>
<style scoped>
</style>