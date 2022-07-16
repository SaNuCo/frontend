<template>
    <div>
        <div v-if="value" class="my-3 preview">
            <v-img :src="`/files/${value}`"></v-img>
            <v-btn icon="mdi-delete" class="delete-button ma-3" color="error" size="large" @click="deleteImage()"/>
        </div>
        <v-file-input v-else label="Select image file"
            accept="image/png, image/jpeg, image/bmp, image/svg+xml" prepend-icon="mdi-image"
            :rules="[fileSizeCheck, fileTypeCheck]" :multiple="false" v-model="file"/>
    </div>
</template>

<script lang="ts">
import gql from "graphql-tag";
import { Vue, Options } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { getType } from "mime"

@Options({

})
export default class ImageUpload extends Vue {
    @Prop({ default: "" })
    value?: string;

    file: File[] = []

    /**
     * Random string which changes when new image is uploaded or image id change
     */
    private randomGetParam = "";

    created() {
        this.randomGetParam = Date.now().toString(10);
    }

    fileSizeCheck(val: File[]) {
        return (
            !val || val.length == 0 ||
            val[0].size < 16777216 ||
            "This image is too large!"
        );
    }

    fileTypeCheck(val: File[]) {
        return (
            !val || val.length == 0 ||
            ["image/png", "image/jpeg", "image/bmp", "image/svg+xml"].includes(
                val[0].type
            ) ||
            "This image file type is not supported"
        );
    }

    /**
     * Create or update the current modeled image with the uploaded image
     */
    async upload() {
        if (this.file) {
            const fromData = new FormData();
            fromData.append("image", this.file[0], this.file[0].name);
            fromData.append("type", getType(this.file[0].name) ?? "application/octet-stream")
            const id = await (await fetch("/files", {
                method: "put",
                body: fromData
            })).text();
            this.$emit("imageChanged", id);
        }
    }

    @Watch("file")
    private fileChanged(newFile: File) {
        this.upload();        
    }

    deleteImage() {
        this.$emit('deleteImage')
        this.file = []
    }
}
</script>
<style scoped>
.delete-button {
    position: absolute;
    top: 0;
    right: 0;
}
.preview {
    position: relative;
    max-height: 50%;
}
</style>