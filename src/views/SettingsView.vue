<template>
    <DialogViewComponent name="Settings">
        <template>
            <div style="background: green; height: 100%; width: 100%"></div>
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
export default class SettingsView extends Vue {

    
}
</script>
<style scoped>
</style>