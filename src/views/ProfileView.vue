<template>
    <DialogViewComponent name="Profile">
        <template #header>
            <v-btn icon @click="toggleDarkMode()" :color="iconModeColor">
                <v-icon>{{ iconModeMDI }}</v-icon>
            </v-btn>
        </template>
        <template #default>
            <div class="ma-3 pa-3">
                <v-text-field placeholder="Display Name" v-model="displayName"></v-text-field>
                <ImageUpload @imageChanged="imageChanged" @deleteImage="deleteImage" :value="avatarId"></ImageUpload>
                <v-btn class="save-button " :disabled="!displayName" @click="save">Save</v-btn>
            </div>
        </template>
    </DialogViewComponent>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useTheme } from "vuetify/lib/framework.mjs";
import DialogViewComponent from "@/components/DialogViewComponent.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import gql from "graphql-tag";

@Options({
    components: {
        DialogViewComponent,
        ImageUpload
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

    async mounted(): Promise<void> {
        const data = (await this.$apollo.query({
            query: gql`query ($username: String!) {
                    users(filter: {
                        username: {
                            eq: $username
                        }
                    }) {
                        nodes {
                            id
                            avatar
                            displayName
                        }
                    }
                }
                `,
            variables: {
                username: localStorage.getItem("username")
            }
        }))
        console.log(data)
        const user = data.data.users.nodes[0]
        this.displayName = user.displayName
        this.avatarId = user.avatar
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

    avatarId: string | null = null
    displayName: string = localStorage.getItem("username") ?? ""

    imageChanged(id: string) {
        this.avatarId = id
    }

    deleteImage() {
        this.avatarId = null
    }

    async save(): Promise<void> {
        const result = await this.$apollo.mutate({
            mutation: gql`mutation ($input: UpdateUserInput!) {
                    updateUser(input: $input) {
                        id
                        displayName
                    }
                }
                `,
            variables: {
                input: {
                    displayName: this.displayName,
                    avatar: this.avatarId
                }
            }
        })
        this.$router.back()
    }
}
</script>
<style scoped>
.save-button {
    float: right;
}
</style>