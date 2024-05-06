<template>
    <v-card>
        <v-card-title>地点削除</v-card-title>
        <v-card-subtitle>地点情報を更新します</v-card-subtitle>
        <v-card-actions>
            <v-combobox placeholder="削除する地点を選択してください." :items="store.comboboxItems" item-title="name" item-value="id"
                v-model="selectedItem"></v-combobox>
            <v-btn @click="onClicked">Delete</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLandmarkStore } from '@/stores/landmark';
import { type components } from '@/openapi/landmarks'
type LandmarkIndex = components["schemas"]["LandmarkIndex"]

const store = useLandmarkStore()
onMounted(() => {
    store.GetComboboxItems()
})

const selectedItem = ref<LandmarkIndex>();

function onClicked() {
    if (selectedItem.value) {
        store.DeleteLandmark(selectedItem.value.id);
    } else {
        console.error("selectedItem is empty")
    }

}
</script>
