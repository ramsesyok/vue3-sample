<template>
    <div>
        <v-card >
            <v-card-title>新規地点登録</v-card-title>
            <v-card-subtitle>新しい地点情報を登録します</v-card-subtitle>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="formData.name" density="compact" label="名称"
                        placeholder="地点の名称を入力してください."></v-text-field>
                    <v-text-field v-model="formData.description" density="compact" label="説明"
                        placeholder="地点の説明を入力してください."></v-text-field>
                    <v-text-field v-model="formData.latitude" type="number" label="緯度" suffix="deg"></v-text-field>
                    <v-text-field v-model="formData.longitude" type="number" label="経度" suffix="deg"></v-text-field>
                    <v-text-field v-model="formData.altitude" type="number" label="高度" suffix="m"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="onClicked">Create</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { useLandmarkStore } from '@/stores/landmark';
import { type components } from '@/openapi/landmarks'
import { reactive } from 'vue';
type Landmark = components["schemas"]["Landmark"]


let formData = reactive<Landmark>({
    name: '',
    description: '',
    latitude: 0.0,
    longitude: 0,
    altitude: 0.0
})

const store = useLandmarkStore()
function onClicked() {
    console.log(formData)
    // const value: Landmark = {
    //     name: formData.name,
    //     description: formData.description,
    //     latitude: formData.latitude,
    //     longitude: formData.longitude,
    //     altitude: formData.altitude,
    // }
    // store.CreateLandmark(value)
}
</script>