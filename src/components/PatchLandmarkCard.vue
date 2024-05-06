<template>
    <v-card>
        <v-card-title>地点部分更新</v-card-title>
        <v-card-subtitle>新しい地点情報を登録します</v-card-subtitle>
        <v-card-text>
            <v-form>
                <v-text-field v-model="store.patchItem.name" density="compact" label="名称"
                    placeholder="地点の名称を入力してください."></v-text-field>
                <v-text-field v-model="store.patchItem.description" density="compact" label="説明"
                    placeholder="地点の説明を入力してください."></v-text-field>
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
    store.ReadLandmark(value.id, 'patch')
}

function onClicked() {
    if (store.patchItem.id )
    {
        const value={
            id: store.patchItem.id,
            name:store.patchItem.name,
            description: store.patchItem.description
        }
        store.PatchLandmark(value)
    }else{
        console.error("store.updateItem.id is empty")
    }
}
</script>