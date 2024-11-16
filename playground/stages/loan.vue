<template>
  <div class="w-96 mx-auto p-4 bg-white shadow-md rounded-lg">
    <div class="mb-4">
      <label for="loanAmount" class="block text-sm font-medium text-gray-700">Loan Amount</label>
      <input
          v-model="state.loanAmount"
          id="loanAmount"
          type="number"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          :class="{'border-red-600': v$.loanAmount?.$error}"
      />
    </div>

    <div class="mb-4">
      <label for="loanPurpose" class="block text-sm font-medium text-gray-700">Loan Purpose</label>
      <input
          v-model="state.loanPurpose"
          id="loanPurpose"
          type="text"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          :class="{'border-red-600': v$.loanPurpose?.$error}"
      />
    </div>

    <div class="mb-4">
      <label for="loanTerm" class="block text-sm font-medium text-gray-700">Loan Term (years)</label>
      <input
          v-model="state.loanTerm"
          id="loanTerm"
          type="number"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          :class="{'border-red-600': v$.loanTerm?.$error}"
      />
    </div>
  </div>
</template>

<!-- export name for cache (<keep-alive />) -->
<script lang="ts">
export default {
  name: "loanDetails"
}
</script>
<script setup lang="ts">
import {ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";

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

const rules = {
  loanAmount: {required},
  loanPurpose: {required},
  loanTerm: {required},
}

const v$ = useVuelidate(rules, state)
const validate = v$.value.$validate

defineExpose({loan: state, validate})
</script>

