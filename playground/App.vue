<template>
  <div>
    <h1>Hello</h1>
    <multi-steps-wizard
        class="mt-8 intro-y"
        :stages="stagesConfiguration"
    >
    </multi-steps-wizard>
  </div>
</template>

<!--:entrypointComponent="currentStage"
returnRouteName="home"
:responseErrorMessages="responseErrorMessages"
:v$="v$"
@saveClick="saveClickHandler"-->

<script setup lang="ts">
import {MultiStepsProviderElement, MultiStepsProviderProps} from '@multi-steps-wizard'
declare module 'vue' {
  export interface GlobalComponents {
    'multi-steps-wizard': MultiStepsProviderProps;
  }
}

if (!customElements.get('multi-steps-wizard')) {
  console.log("Invoke")
  customElements.define('multi-steps-wizard', MultiStepsProviderElement)
}

const stagesConfiguration = {}
</script>