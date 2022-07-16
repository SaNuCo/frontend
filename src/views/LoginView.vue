<template>
    <v-card class="ma-3 pa-3">
        <v-text-field v-model="username" placeholder="Username"/>
        <v-btn :disabled="!username" @click="login()" class="login-button">
            Login
        </v-btn>
    </v-card>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    
})
export default class LoginView extends Vue {
    username = ""

    login() {
        localStorage.setItem("username", this.username);
        this.$router.push("/home")
    }
}
</script>

<style scoped>
.login-button {
    float: right;
}
</style>