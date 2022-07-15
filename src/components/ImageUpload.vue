<template>
    <div>
        <v-file-input
            v-if="!imagePresent"
            :label="Select image file"
            v-model="file"
            :disabled="disabled"
            :loading="isUploading"
            accept="image/png, image/jpeg, image/bmp, image/svg+xml"
            prepend-icon="mdi-image"
            :rules="[fileSizeCheck, fileTypeCheck]"
        />
        <v-hover>
            <template v-slot:default="{ hover }">
                <v-card
                    flat
                    outlined
                    v-if="imagePresent"
                    class="pa-3 mt-3 mb-3"
                >
                    <v-img
                        :src="imageUrl"
                        :max-height="200"
                        contain
                    >
                    </v-img>
                    <v-fade-transition>
                        <v-overlay
                            v-show="hover"
                            absolute
                            class="mt-0 delete-overlay"
                            opacity="0.7"
                        >
                            <v-btn text @click="removeImage" top left>
                                <v-icon>mdi-close-outline</v-icon>
                                Delete Image
                            </v-btn>
                        </v-overlay>
                    </v-fade-transition>
                </v-card>
            </template>
        </v-hover>
    </div>
</template>

<script lang="ts">
import { httpEndpoint } from "@/plugins/vue-apollo";
import gql from "graphql-tag";
import { Vue, Options } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import LocalizedStringEdit from "./LocalizedStringEdit.vue";

@Options({
    name: "ImageUpload",
    apollo: {
        image: {
            query: gql`
                query($id: ID!) {
                    node(id: $id) {
                        ... on Image {
                            id
                            altText {
                                locale
                                value
                            }
                        }
                    }
                }
            `,
            variables: function() {
                return {
                    id: this.value
                };
            },
            update: function(res: { node: Image }) {
                addGQLTranslations(res.node.id, "altText", res.node.altText);
                return res.node;
            },
            skip: function() {
                return !this.value || this.value == "new";
            }
        }
    }
})
export default class ImageUpload extends Vue {
    @Prop()
    private value?: string;

    @Prop({
        default: false
    })
    disabled?: boolean;

    image: Image | null = null;

    uploadImgValid = false;

    file?: File | null = null;

    fileRemoved = false;

    isUploading = false;

    /**
     * Random string which changes when new image is uploaded or image id change
     */
    private randomGetParam = "";

    constructor() {
        super();
        this.randomGetParam = Date.now().toString(10);
    }

    @Watch("value")
    private imgIdChanged() {
        this.refetch();
    }

    private fileSizeCheck(val: File) {
        return (
            !val ||
            val.size < 16777216 ||
            "This image is too large!"
        );
    }

    private fileTypeCheck(val: File) {
        return (
            !val ||
            ["image/png", "image/jpeg", "image/bmp", "image/svg+xml"].includes(
                val.type
            ) ||
            "This image file type is not supported"
        );
    }

    public async refetch() {
        if (this.value == null || this.value == "new") {
            this.image = undefined;
        } else {
            await this.$apollo.queries.image.refetch();
            this.randomGetParam = Date.now().toString(10);
        }
    }

    public get hasFile(): boolean {
        return !!this.file;
    }

    public reset() {
        this.file = null;
        this.fileRemoved = false;
    }

    private async removeImage() {
        this.$emit("imageChanged");
        if (this.value && this.value !== "new") {
            this.fileRemoved = true;
        }
        this.file = null;
    }

    /**
     * Saves the changes: uploads the image if there is a new one, deletes the image otherweise
     */
    public async save() {
        if (this.file) {
            await this.upload();
        } else if (this.fileRemoved) {
            await this.deleteImage();
        }
    }

    /**
     * Create or update the current modeled image with the uploaded image
     */
    private async upload() {
        // TODO
    }

    private async deleteImage() {
        if (this.value != undefined) {
            // TODO
            this.randomGetParam = Date.now().toString(10);
            this.$emit("input", "new");
        }
    }

    private get imageUrl(): string | null {
        if (this.file != null) {
            return URL.createObjectURL(this.file);
        } else if (this.value && this.value !== "new" && !this.fileRemoved) {
            return `${httpEndpoint}internal/images/${this.value}?${this.randomGetParam}`;
        } else {
            return null;
        }
    }

    private get imagePresent(): boolean {
        return this.imageUrl != null;
    }

    @Watch("file")
    private fileChanged(newFile: File) {
        this.$emit("imageChanged");
    }
}
</script>
