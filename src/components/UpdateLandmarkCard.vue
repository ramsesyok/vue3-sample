<template>
    <v-card >
        <v-card-title>地点更新</v-card-title>
        <v-card-subtitle>地点情報を更新します</v-card-subtitle>
        <v-card-text>
            <v-form>
                <v-text-field v-model="store.updateItem.name" density="compact" label="名称"
                    placeholder="地点の名称を入力してください."></v-text-field>
                <v-text-field v-model="store.updateItem.description" density="compact" label="説明"
                    placeholder="地点の説明を入力してください."></v-text-field>
                <v-text-field v-model="store.updateItem.latitude" type="number" label="緯度" suffix="deg"></v-text-field>
                <v-text-field v-model="store.updateItem.longitude" type="number" label="経度" suffix="deg"></v-text-field>
                <v-text-field v-model="store.updateItem.altitude" type="number" label="高度" suffix="m"></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-combobox :items="store.comboboxItems" item-title="name" item-value="id"
                @update:modelValue="onChanged"></v-combobox>
            <v-btn @click="onClicked">UPDATE</v-btn>
        </v-card-actions>
    </v-card>

</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useLandmarkStore } from '@/stores/landmark';

const store = useLandmarkStore()
onMounted(() => {
    store.GetComboboxItems()
})

function onChanged(value: any) {
    store.ReadLandmark(value.id, 'update')
}

function onClicked() {
    if (store.updateItem.id) {
        store.UpdateLandmark(store.updateItem.id, store.updateItem)
    } else {
        console.error("store.updateItem.id is empty")
    }
}
</script>