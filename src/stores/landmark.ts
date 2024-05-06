import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type components } from '@/openapi/landmarks'
import { BadRequestError, NotFoundError, ServerError } from '@/openapi/exceptions'
import landmarksAPI from '@/openapi/landmarksAPI'
type Landmark = components["schemas"]["Landmark"]
type SearchQuery = components["schemas"]["LandmarkSearchQuery"]
type LandmarkIndex = components["schemas"]["LandmarkIndex"]

export const useLandmarkStore = defineStore('landmark', () => {
    const readonlyItem = ref<Landmark>({
        name: '未取得',
        description: '-',
        latitude: 0,
        longitude: 0,
        altitude: 0
    })
    const patchItem = ref<Landmark>({
        name: '未取得',
        description: '-',
        latitude: 0,
        longitude: 0,
        altitude: 0
    })
    const updateItem = ref<Landmark>({
        name: '未取得',
        description: '-',
        latitude: 0,
        longitude: 0,
        altitude: 0
    })
    const onErrorOccurred = ref(false)
    const errorMessage = ref("")
    const errorParames = ref({})
    const currentLoading = ref(false)

    const onLandmarkCreated = ref(false)
    const message = ref("")
    // CreateLandmark 地点情報の生成
    async function CreateLandmark(body: Landmark) {
        onLandmarkCreated.value = true
        try {
            const response = await landmarksAPI.POST('/landmarks', {
                body: body
            })
            if (response.data) {
                console.log(response.data)
            }
        } catch (error) {
            if (error instanceof NotFoundError) {
                console.log(error.message)
            }
            if (error instanceof BadRequestError) {
                console.log(error.message)
            }
            if (error instanceof ServerError) {
                console.log(error.message)
            }
            onErrorOccurred.value = true
        } finally {
            onLandmarkCreated.value = false
        }
    }


    // ReadLandmark 地点情報の取得
    async function ReadLandmark(id: number, target: string) {
        currentLoading.value = true
        try {
            const response = await landmarksAPI.GET(`/landmarks/{id}`, {
                params: {
                    path: { id: id },
                }
            })
            if (response.data) {
                if (target === 'readonly') {
                    readonlyItem.value = response.data
                } else if (target === 'patch') {
                    patchItem.value = response.data
                } else if (target === 'update') {
                    updateItem.value = response.data
                }
            }
        } catch (error) {
            if (error instanceof NotFoundError) {
                errorMessage.value = error.message

            }
            if (error instanceof BadRequestError) {
                errorMessage.value = error.message
                errorParames.value = error.arguments
            }
            if (error instanceof ServerError) {
                errorMessage.value = error.message
                errorParames.value = error.arguments
            }
            onErrorOccurred.value = true
        } finally {
            currentLoading.value = false
        }
    }


    async function UpdateLandmark(id: number, params: Landmark) {
        currentLoading.value = true
        try {
            const response = await landmarksAPI.PUT(`/landmarks/{id}`, {
                params: {
                    path: { id: id },
                },
                body: params,
            })
            if (response.data) {
                console.log(response.data.updatedId)
            }
        } catch (error) {
            if (error instanceof NotFoundError) {
                console.log(error.message)
            }
            if (error instanceof BadRequestError) {
                console.log(error.message)
            }
            if (error instanceof ServerError) {
                console.log(error.message)
            }

            onErrorOccurred.value = true
        } finally {
            currentLoading.value = false
        }
    }
    async function PatchLandmark(value: { id: number, name: string | undefined, description: string | undefined }) {
        currentLoading.value = true
        try {
            const response = await landmarksAPI.PATCH(`/landmarks/{id}`, {
                params: {
                    path: { id: value.id },
                },
                body: value,
            })
            if (response.data) {
                console.log(response.data.updatedId)
            }
        } catch (error) {
            if (error instanceof NotFoundError) {
                console.log(error.message)
            }
            if (error instanceof BadRequestError) {
                console.log(error.message)
            }
            if (error instanceof ServerError) {
                console.log(error.message)
            }

            onErrorOccurred.value = true
        } finally {
            currentLoading.value = false
        }
    }

    async function DeleteLandmark(id: number) {
        currentLoading.value = true
        try {
            const response = await landmarksAPI.DELETE(`/landmarks/{id}`, {
                params: {
                    path: { id: id },
                }
            })

        } catch (error) {
            if (error instanceof NotFoundError) {
                console.log(error.message)
            }
            if (error instanceof BadRequestError) {
                console.log(error.message)
            }
            if (error instanceof ServerError) {
                console.log(error.message)
            }
            onErrorOccurred.value = true
        } finally {
            currentLoading.value = false
        }
    }


    const tableItems = ref<Landmark[]>()
    const tableItemsLength = ref(0)

    async function SearchLandmarks(query: SearchQuery) {
        try {
            const response = await landmarksAPI.POST('/landmarks/_search', {
                body: query
            })
            if (response.data) {
                tableItems.value = response.data.items
                tableItemsLength.value = response.data.total
            }
        } catch (error) {
            console.log(error)
        } finally {
            console.log("message")
        }
    }


    const autocompleteItems = ref<LandmarkIndex[]>()
    async function GetAutocompletesItems(name: string) {
        try {
            let query = undefined
            if (name !== '') {
                query = {
                    name: name
                }
            }
            const response = await landmarksAPI.GET('/landmarks', {
                params: {
                    query: query,
                }
            })
            if (response.data) {
                autocompleteItems.value = response.data.items
            }
        } catch (error) {
            console.log(error)
        } finally {
            console.log("message")
        }
    }

    const comboboxItems = ref<LandmarkIndex[]>()
    async function GetComboboxItems() {
        try {
            const response = await landmarksAPI.GET('/landmarks')
            if (response.data) {
                comboboxItems.value = response.data.items
            }
        } catch (error) {
            console.log(error)
        } finally {
            console.log("message")
        }
    }


    return { readonlyItem, patchItem, updateItem, tableItems, tableItemsLength, autocompleteItems, comboboxItems, currentLoading, onErrorOccurred, message, CreateLandmark, ReadLandmark, UpdateLandmark, PatchLandmark, DeleteLandmark, SearchLandmarks, GetAutocompletesItems, GetComboboxItems }
})
