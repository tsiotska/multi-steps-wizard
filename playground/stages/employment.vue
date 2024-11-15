<template>
  <div class="w-96 mx-auto p-4 bg-white shadow-md rounded-lg">
    <div class="mb-4">
      <label for="employerName" class="block text-sm font-medium text-gray-700">Employer Name</label>
      <input
          v-model="state.employerName" id="employerName"
          type="text"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          :class="{'border-red-600': v$.employerName?.$error}"
      />
    </div>

    <div class="mb-4">
      <label for="jobTitle" class="block text-sm font-medium text-gray-700">Job Title</label>
      <input
          v-model="state.jobTitle"
          id="jobTitle"
          type="text"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          :class="{'border-red-600': v$.jobTitle?.$error}"
      />
    </div>

    <div class="mb-4">
      <label for="annualIncome" class="block text-sm font-medium text-gray-700">Annual Income</label>
      <input
          v-model="state.annualIncome"
          id="annualIncome"
          type="number"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          :class="{'border-red-600': v$.annualIncome?.$error}"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";

interface DetailsProps {
  payload: {
    employerName: string,
    jobTitle: string,
    annualIncome: string,
  }
}

const props = withDefaults(defineProps<DetailsProps>(), {
  payload: () => ({
    employerName: "",
    jobTitle: "",
    annualIncome: "",
  })
})


const state = ref({
  employerName: props.payload.employerName,
  jobTitle: props.payload.jobTitle,
  annualIncome: props.payload.annualIncome
})

const rules = {
  employerName: {required},
  jobTitle: {required},
  annualIncome: {required}
}

const v$ = useVuelidate(rules, state)
const validate = v$.value.$validate

defineExpose({employment: state, validate})
</script>

