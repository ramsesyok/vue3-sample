// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useLandmarkStore } from '@/stores/landmark'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Counter Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('increments', () => {
    const landmark = useLandmarkStore()
    expect(landmark.count).toBe(0)
    landmark.increment()
    expect(landmark.count).toBe(1)
  })

  it('increments by amount', async () => {
    const landmark = useLandmarkStore()
    landmark.GetLandmarksID(1)
  })
})