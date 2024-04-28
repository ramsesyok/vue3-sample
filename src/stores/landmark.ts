import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type components } from '@/openapi/landmarks'
import landmarksAPI from '@/openapi/landmarksAPI'
type Landmark = components["schemas"]["Landmark"]

export const useLandmarkStore = defineStore('landmark', () => {
    const current = ref<Landmark>({
        name: '',
        description: '',
        latitude: 0,
        longitude: 0,
        altitude: 0
    })
    const currentLoading = ref(false)
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
        count.value++
    }

    async function GetLandmarksID(id: number) {
        currentLoading.value=true
        try {
            const response = await landmarksAPI.GET(`/landmarks/{id}`, {
                params: {
                    path: { id: id },                   
                }
            })
            if (response.data) {
                current.value = response.data
                console.log(current.value.name)
            }
        } catch (error) {
            console.log(error)
        }finally {
            currentLoading.value = false
        }        
    }

    return { count, current, doubleCount,currentLoading, increment , GetLandmarksID}
})
