// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useLandmarkStore } from '@/stores/landmark'
import { beforeEach, describe, expect, it } from 'vitest'
import { type components } from '@/openapi/landmarks'
type Landmark = components["schemas"]["Landmark"]
describe('Counter Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  // it('increments', () => {
  //   const landmark = useLandmarkStore()
  //   expect(landmark.count).toBe(0)
  //   landmark.increment()
  //   expect(landmark.count).toBe(1)
  // })

  it('GetLandmarksID', async () => {
    const landmark = useLandmarkStore()
    landmark.ReadLandmark(100)
  })
  // it('CreateLandmark', async () => {
  //   const input : Landmark ={
  //     name:"abcdaefg",
  //     description:"hijelfm",
  //     latitude:10,
  //     longitude:20,
  //     altitude:10.0
  //   }
  //   const landmark = useLandmarkStore()
    
  //   landmark.CreateLandmark(input);
  // })
})