<template>
  <div class="w-96 mx-auto p-4 bg-white shadow-md rounded-lg">
    <div class="mb-4">
      <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
      <input
          v-model="state.fullName" id="fullName" type="text"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          :class="{'border-red-600': v$.fullName?.$error}"
      />
      <div v-if="v$.fullName.$error" class="text-sm text-danger">{{ v$.fullName.$errors[0].$message }}</div>
    </div>

    <div class="mb-4">
      <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
      <input
          v-model="state.age" id="age" type="number"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          :class="{'border-red-600': v$.age?.$error}"
      />
      <div v-if="v$.age.$error" class="text-sm text-danger">{{ v$.age.$errors[0].$message }}</div>
    </div>

    <div class="mb-4">
      <label for="dateOfBirth" class="block text-sm font-medium text-gray-700">Date of Birth</label>
      <input
          v-model="state.dateOfBirth"
          id="dateOfBirth"
          type="text"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          :class="{'border-red-600': v$.dateOfBirth?.$error}"
      />
      <div v-if="v$.dateOfBirth.$error" class="text-sm text-danger">{{ v$.dateOfBirth.$errors[0].$message }}</div>
    </div>

    <div class="mb-4 flex items-center">
      <input
          v-model="state.skipNextStage"
          id="skipNextStage"
          type="checkbox"
          class="mr-2"
          :class="{'border-red-600': v$.skipNextStage?.$error}"
      />
      <label for="skipNextStage" class="text-sm font-medium text-gray-700">Skip Next Stage</label>
    </div>
  </div>
</template>

<!-- export name for cache (<keep-alive />) -->
<script lang="ts">
export default {
  name: "loanPersonal"
}
</script>
<script setup lang="ts">
import {ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {minValue, required} from "@vuelidate/validators";

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
  dateOfBirth: props.payload.dateOfBirth,
  skipNextStage: props.payload.skipNextStage,
})

const rules = {
  fullName: {required},
  age: {required, minValue: minValue(18)},
  dateOfBirth: {required},
}

const v$ = useVuelidate(rules, state)
const validate = v$.value.$validate

defineExpose({personal: state, validate})
</script>

