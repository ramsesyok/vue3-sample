<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="store.GetLandmarksID(1)">Button</button>
    <h2>{{ store.current.name }}</h2>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script setup>
import { useLandmarkStore } from '@/stores/landmark';

const store = useLandmarkStore();

</script>