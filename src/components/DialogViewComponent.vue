<template>
    <div class="container">
        <v-app-bar ic>
            <v-btn icon="mdi-arrow-left" @click="goBack()"/>
            <v-toolbar-title>
                {{ name }}
            </v-toolbar-title>
            <v-spacer/>
            <slot name="header"></slot>
        </v-app-bar>
        <div class="main-content">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Provide, ProvideReactive, Watch } from "vue-property-decorator";

@Options({})
export default class DialogViewComponent extends Vue {
    @Prop()
    name!: string

    goBack() {
        this.$router.back()
    }
}
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}
.main-content {
    flex-grow: 1;
    width: 100%;
}
</style>