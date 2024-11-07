<template>
  <div>
    <h1>Hello</h1>
    <multi-steps-wizard></multi-steps-wizard>
  </div>
</template>

<script setup>
import {MultiStepsProviderElement} from '@multi-steps-wizard'

if (!customElements.get('multi-steps-wizard')) {
  console.log("Invoke")
  customElements.define('multi-steps-wizard', MultiStepsProviderElement)
}
</script>