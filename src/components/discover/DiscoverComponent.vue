<template>
    <Tinder ref="tinder" key-name="id" v-model:queue="queue" :offset-y="10" @submit="onSubmit" :allowSuper="false" :allowDown="false">
        <template v-slot="scope">
            <div
                class="pic"
                :style="{
                    'background-image': `url(https://bing.com//th?id=OHR.${scope.data.id}_UHD.jpg&pid=hp&w=720&h=1280&rs=1&c=4&r=0)`
                }"
            />
        </template>
        <template v-slot:like>
            <v-icon class="like-pointer" size="x-large" color="success">mdi-thumb-up</v-icon>
        </template>
        <template v-slot:nope>
            <v-icon class="dislike-pointer" size="x-large" color="error">mdi-thumb-down</v-icon>
        </template>
    </Tinder>
    <div class="buttons">
        <v-btn size="x-large" icon="mdi-thumb-down" class="ma-5" color="error" @click="$refs.tinder.decide('nope')"/>
        <v-btn size="x-large" icon="mdi-thumb-up" class="ma-5" color="success" @click="$refs.tinder.decide('like')"/>
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
    offset = 0;
    
    created() {
        this.mock();
    }

    onSubmit(item: any) {
        console.log(item)
        if (this.queue.length < 3) {
            this.mock();
        }
        //this.history.push(item);
    }

    mock(count = 5, append = true) {
      const list = [];
      for (let i = 0; i < count; i++) {
        list.push({ id: source[this.offset] });
        this.offset++;
      }
      if (append) {
        this.queue = this.queue.concat(list);
      } else {
        this.queue.unshift(...list);
      }
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

.pic {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.buttons {
    display: flex;
    justify-content: center;
    align-items: end;
    height: 100%
}
</style>