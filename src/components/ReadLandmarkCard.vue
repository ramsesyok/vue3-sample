<template>
  <div>
    <v-card >
      <v-card-title>{{ store.readonlyItem.name }} </v-card-title>
      <v-card-subtitle> {{ store.readonlyItem.description }} </v-card-subtitle>
      <v-card-text>
        <v-list>
          <v-list-item density="compact" prepend-icon="mdi-map-marker">
            <v-list-item-subtitle>({{ store.readonlyItem.latitude?.toPrecision(13).padStart(16, '&nbsp;') }},{{
              store.readonlyItem.longitude?.toPrecision(13).padStart(16,'&nbsp;') }})</v-list-item-subtitle>
          </v-list-item>
          <v-list-item density="compact" prepend-icon="mdi-format-vertical-align-top">
            <v-list-item-subtitle>{{ store.readonlyItem.altitude?.toFixed(1).padStart(5, '&nbsp;')
              }}[m]</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row justify="space-between">
            <v-autocomplete label="県庁所在地を選択（補間あり）" v-model="search" :items="items" item-value="id" item-title="name"
              @input="handleInput" @update:modelValue="onChanged"></v-autocomplete>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useLandmarkStore } from '@/stores/landmark';
import { ref, computed, onMounted } from 'vue';
const store = useLandmarkStore()
const items = computed(() => store.autocompleteItems);
const search = ref('');
function handleInput(value: any) {
  store.GetAutocompletesItems(value.data)
}

onMounted(() => {
  store.GetAutocompletesItems('')
})
function onChanged(value: string) {
  store.ReadLandmark(+value, 'readonly')
}
</script>