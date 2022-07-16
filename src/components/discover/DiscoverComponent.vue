<template>
    <Tinder ref="tinder" key-name="id" v-model:queue="queue" :offset-y="10" @submit="onSubmit" :allowSuper="false"
        :allowDown="false">
        <template v-slot="scope">
            <v-card class="pa-3 card-wrapper" elevation="24" rounded="xl">
                <div class="discover-card">
                    <div class="text-center text-h6">
                        {{ scope.data.title }}
                    </div>
                    <img v-if="scope.data.image" :src="scope.data.image" class="card-img my-3" />
                    <div>
                        {{ scope.data.content }}
                    </div>
                </div>
            </v-card>
        </template>
        <template v-slot:like>
            <v-icon class="like-pointer" size="x-large" color="success">mdi-thumb-up</v-icon>
        </template>
        <template v-slot:nope>
            <v-icon class="dislike-pointer" size="x-large" color="error">mdi-thumb-down</v-icon>
        </template>
    </Tinder>
    <div class="buttons">
        <v-btn size="x-large" icon="mdi-undo" class="ma-5" color="warning" @click="undo()"/>
        <v-btn size="x-large" icon="mdi-thumb-down" class="ma-5" color="error" @click="$refs.tinder.decide('nope')" />
        <v-btn size="x-large" icon="mdi-thumb-up" class="ma-5" color="success" @click="$refs.tinder.decide('like')" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// @ts-ignore
import Tinder from "vue-tinder";
import source from "./bing"
import "vue-tinder/lib/style.css"

@Options({
    components: {
        Tinder
    }
})
export default class DiscoverComponent extends Vue {

    declare $refs: {
        tinder: any
    }

    queue: any[] = [];
    history: any[] = [];
    offset = 0;

    created() {
        this.mock();
    }

    onSubmit(item: any) {
        if (this.queue.length < 3) {
            this.mock();
        }
        this.history.push(item.item);
    }

    undo() {
        if (this.history.length) {
            this.$refs.tinder.rewind([this.history.pop()]);
        }
    }

    mock(count = 5, append = true) {
        const list = [];
        for (let i = 0; i < count; i++) {
            list.push({
                id: source[this.offset],
                title: "Hello darkness my old friend",
                image: `https://bing.com//th?id=OHR.${source[this.offset]}_UHD.jpg&pid=hp&w=720&h=1280&rs=1&c=4&r=0`,
                content: loremIpsum
            });
            this.offset++;
        }
        if (append) {
            this.queue = this.queue.concat(list);
        } else {
            this.queue.unshift(...list);
        }
    }
}

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
</script>

<style scoped>
body {
    margin: 0;
    background-color: #20262e;
    overflow: hidden;
}

.vue-tinder {
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 40px;
    margin: auto;
    width: calc(100% - 80px);
    height: calc(100% - 160px);
}

.dislike-pointer,
.like-pointer {
    position: absolute;
    z-index: 1;
    top: 30px;
    width: 64;
    height: 64;
}

.dislike-pointer {
    right: 30px;
}

.like-pointer {
    left: 30px;
}

.discover-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card-img {
    max-width: 100%;
    max-height: 40%;
}

.card-wrapper {
    height: 100%;
    width: 100%;
}

.buttons {
    display: flex;
    justify-content: center;
    align-items: end;
    height: 100%
}

</style>
<style>
.tinder-card {
    background: none !important;
    box-shadow: none !important;
    overflow: visible !important;
}
</style>