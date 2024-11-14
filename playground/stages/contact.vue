<template>
  <div class="w-96 mx-auto p-4 bg-white shadow-md rounded-lg">
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
          v-model="state.email"
          id="email"
          type="email"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          :class="{'border-red-600': v$.email?.$error}"
      />
    </div>

    <div class="mb-4">
      <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number</label>
      <input
          v-model="state.phoneNumber" id="phoneNumber"
          type="tel"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          :class="{'border-red-600': v$.phoneNumber?.$error}"
      />
    </div>

    <div class="mb-4">
      <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
      <input
          v-model="state.address"
          id="address"
          type="text"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          :class="{'border-red-600': v$.address?.$error}"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {inject, Ref, ref} from "vue";
import {Validation} from "@vuelidate/core";
import type {IUserLoanData} from "../app";

interface DetailsProps {
  payload: {
    email: string,
    phoneNumber: string,
    address: string,
  }
}

const props = withDefaults(defineProps<DetailsProps>(), {
  payload: () => ({
    email: "",
    phoneNumber: "",
    address: "",
  })
})

const v$ = inject<Validation<Ref<IUserLoanData>>>('validator')?.value?.contacts

const state = ref({
  email: props.payload.email,
  phoneNumber: props.payload.phoneNumber,
  address: props.payload.address
})
</script>