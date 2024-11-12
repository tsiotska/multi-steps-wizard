<template>
  <div class="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
    <div class="mb-4">
      <label for="loanAmount" class="block text-sm font-medium text-gray-700">Loan Amount</label>
      <input v-model="state.loanAmount" id="loanAmount" type="number" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
    </div>

    <div class="mb-4">
      <label for="loanPurpose" class="block text-sm font-medium text-gray-700">Loan Purpose</label>
      <input v-model="state.loanPurpose" id="loanPurpose" type="text" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
    </div>

    <div class="mb-4">
      <label for="loanTerm" class="block text-sm font-medium text-gray-700">Loan Term (years)</label>
      <input v-model="state.loanTerm" id="loanTerm" type="number" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

interface DetailsProps {
  payload: {
    loanAmount: string,
    loanPurpose: string,
    loanTerm: string,
  }
}

const props = withDefaults(defineProps<DetailsProps>(), {
  payload: () => ({
    loanAmount: "",
    loanPurpose: "",
    loanTerm: ""
  })
})

const state = ref({
  loanAmount: props.payload.loanAmount,
  loanPurpose: props.payload.loanPurpose,
  loanTerm: props.payload.loanTerm
})
</script>

