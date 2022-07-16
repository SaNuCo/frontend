<template>
    <DialogViewComponent :name="offeringId == null ? 'Create Offering' : 'Update Offering'">
        <template #default>
            <div class="ma-3 pa-3">
                <v-text-field placeholder="Title" v-model="title"></v-text-field>
                <v-select label="Category" v-model="category" :items="categories" />
                <ImageUpload @imageChanged="imageChanged" @deleteImage="deleteImage" :value="imageId"></ImageUpload>
                <v-textarea placeholder="Description" v-model="description"></v-textarea>
                <MapComponent class="location-picker mb-5" :pickerMode="true" @pickerUpdated="pickerUpdated"
                    :pickerCoordinates="location" />
                <v-btn class="save-button " :disabled="!title || !location" @click="save">{{ offeringId == null ?
                        "Create" : "Update"
                }}</v-btn>
            </div>
        </template>
    </DialogViewComponent>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DialogViewComponent from "@/components/DialogViewComponent.vue";
import ImageUpload from "../components/ImageUpload.vue";
import MapComponent from "../components/map/MapComponent.vue";
import gql from "graphql-tag";

@Options({
    components: {
        DialogViewComponent,
        ImageUpload,
        MapComponent
    }
})
export default class OfferingView extends Vue {

    imageId = ""
    title = ""
    description = ""
    category = "share"
    location: [number, number] | null = null

    categories = [
        {
            value: "share",
            title: "Share your food"
        }, {
            value: "together",
            title: "Cook and eat together"
        }
    ]

    get offeringId(): string | null {
        return (this.$route.params.id ?? null) as string | null
    }

    imageChanged(id: string) {
        this.imageId = id
    }

    deleteImage() {
        this.imageId = ""
    }

    pickerUpdated(coordinates: [number, number]) {
        this.location = coordinates
    }

    async save(): Promise<void> {
        if (this.offeringId == null) {
            await this.$apollo.mutate({
                mutation: gql`mutation ($input: FoodOfferingInput!) {
                    createFoodOffering(input: $input) {
                        id
                    }
                }
                `,
                variables: {
                    input: {
                        title: this.title,
                        picture: this.imageId,
                        location: this.location,
                        category: this.category
                    }
                }
            })
        } else {

        }

        this.$router.back()
    }

}
</script>
<style scoped>
.save-button {
    float: right;
}

.location-picker {
    width: 100%;
    aspect-ratio: 1.4;
}
</style>