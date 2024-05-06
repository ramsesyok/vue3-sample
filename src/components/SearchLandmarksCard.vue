<template>
    <v-card>
        <v-card-title>地点一覧</v-card-title>
        <v-card-subtitle>地点情報の一覧を取得</v-card-subtitle>
        <v-card-text>
            <v-text-field v-model="searchField" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
                hide-details single-line></v-text-field>
            <v-data-table-server :headers="tableHeaders" :items="store.tableItems"
                :items-length="store.tableItemsLength" :search="searchField" item-value="name"
                @update:options="updateDataTable"></v-data-table-server>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useLandmarkStore } from '@/stores/landmark';
import { type components } from '@/openapi/landmarks'
import type { VDataTable, VDataTableServer } from 'vuetify/components'

type ReadonlyHeaders = VDataTable['$props']['headers']
type SearchQuery = components["schemas"]["LandmarkSearchQuery"]
type SortField = components["schemas"]["SortField"]
type FilterField = components["schemas"]["FilterField"]
const store = useLandmarkStore()
const searchField = ref('')

function updateDataTable(options: any) {

    let sort: SortField | undefined
    if (options.sortBy.length != 0) {
        sort = {
            field: options.sortBy[0].key,
            type: options.sortBy[0].order
        }
    }
    let filter: FilterField | undefined
    if (searchField.value != '') {
        filter = {
            field: 'name',
            value: searchField.value,
            type: 'partial'
        }
    }
    const query: SearchQuery = {
        perPage: options.itemsPerPage,
        page: options.page,
        sort: sort,
        filter: filter,
    }
    store.SearchLandmarks(query)
}

const tableHeaders = ref<ReadonlyHeaders>([
    {
        key: 'name',
        title: '名称'
    },
    {
        key: 'description',
        title: '説明',
        sortable: false,
    },
    {
        key: 'latitude',
        title: '緯度'
    },
    {
        key: 'longitude',
        title: '経度'
    },
    {
        key: 'altitude',
        title: '高度'
    }
])
</script>