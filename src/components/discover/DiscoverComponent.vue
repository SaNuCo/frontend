<template>
    <Tinder ref="tinder" key-name="id" v-model:queue="queue" :offset-y="10" @submit="onSubmit" :allowSuper="false"
        :allowDown="false">
        <template v-slot="scope">
            <v-card class="pa-3 card-wrapper" elevation="24" rounded="xl">
                <div class="discover-card">
                    <div class="text-center text-h6">
                        {{ scope.data.title }}
                    </div>
                    <img v-if="scope.data.picture" :src="`/files/${scope.data.picture}`" class="card-img my-3" />
                    <div>
                        {{ scope.data.description }}
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
import "vue-tinder/lib/style.css"
import gql from "graphql-tag";

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
    endcursor: string | null = null

    created() {
        this.getMoreData()
    }

    onSubmit(item: any) {
        const decision = item.type
        if (this.queue.length < 3) {
            this.getMoreData();
        }
        this.history.push(item.item);
    }

    undo() {
        if (this.history.length) {
            this.$refs.tinder.rewind([this.history.pop()]);
        }
    }

    async getMoreData(count = 20) {
        const lastId = this.queue[this.queue.length - 1]?.id ?? null
        const result = await this.$apollo.query({
            query: gql`query ($location: [Float!]!, $after: ID, $count: Int!) {
                foodOfferingsNear(after:$after, count: $count, location: $location) {
                    id
                    title
                    picture
                    category
                    description
                    location
                }
            }`,
            variables: {
                location: [9.174886529310387, 48.772661078848294],
                after: lastId,
                count: count
            }
        })
        const offerings = result.data.foodOfferingsNear
        this.queue = this.queue.concat(offerings)
    }
}

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