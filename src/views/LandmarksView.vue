<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <CreateLandmarkCard />
      </v-col>
      <v-col cols="12">
        <UpdateLandmarkCard />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <PatchLandmarkCard />
      </v-col>
      <v-col cols="12">
        <DeleteLandmarkCard />
      </v-col>
      <v-col cols="12">
        <ReadLandmarkCard />
      </v-col>
      <v-col cols="12">
        <SearchLandmarksCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import CreateLandmarkCard from '@/components/CreateLandmarkCard.vue';
import ReadLandmarkCard from '@/components/ReadLandmarkCard.vue';
import UpdateLandmarkCard from '@/components/UpdateLandmarkCard.vue';
import PatchLandmarkCard from '@/components/PatchLandmarkCard.vue';
import DeleteLandmarkCard from '@/components/DeleteLandmarkCard.vue';
import SearchLandmarksCard from '@/components/SearchLandmarksCard.vue';
</script>
