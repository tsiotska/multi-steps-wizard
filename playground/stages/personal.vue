<template>
  <div class="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
    <div class="mb-4">
      <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
      <input v-model="state.fullName" id="fullName" type="text" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
    </div>

    <div class="mb-4">
      <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
      <input v-model="state.age" id="age" type="number" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
    </div>

    <div class="mb-4">
      <label for="dateOfBirth" class="block text-sm font-medium text-gray-700">Date of Birth</label>
      <input v-model="state.dateOfBirth" id="dateOfBirth" type="number" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
    </div>

    <div class="mb-4 flex items-center">
      <input v-model="state.skipNextStage" id="skipNextStage" type="checkbox" class="mr-2"/>
      <label for="skipNextStage" class="text-sm font-medium text-gray-700">Skip Next Stage</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

interface DetailsProps {
  payload: {
    fullName: string,
    age: number,
    dateOfBirth: string,
    skipNextStage: boolean
  }
}

const props = withDefaults(defineProps<DetailsProps>(), {
  payload: () => ({
    fullName: "",
    age: 0,
    dateOfBirth: "",
    skipNextStage: false
  })
})

const state = ref({
  fullName: props.payload.fullName,
  age: props.payload.age,
  dateOfBirth:props.payload.dateOfBirth,
  skipNextStage: props.payload.skipNextStage,
})
</script>

