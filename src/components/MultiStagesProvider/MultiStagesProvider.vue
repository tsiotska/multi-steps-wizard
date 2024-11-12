<template>
  <div class="flex flex-col text-start h-full">
    <!-- BEGIN: BACK/NEXT BUTTONS LINE -->
    <div>
      <div class="flex">
        <Button
            v-if="currentStage.prevStage"
            class="mr-8"
            variant="outline-primary"
            @click="toPreviousPage()"
            :title="prevButtonTooltip"
            :disabled="isPrevButtonDisabled"
        >
           <Lucide icon="ArrowLeft" class="w-5 h-5 mr-2"/>
          Back
        </Button>
        <div class="hidden md:flex w-full max-w-4xl mr-8">
          <slot name="title"/>
        </div>
        <Button variant="primary" class="ml-auto" @click="onSaveClick">Save</Button>
        <Button
            v-if="currentStage.nextStage"
            variant="primary"
            class="ml-4"
            @click="toNextPage({})"
            :disabled="isNextButtonDisabled"
        >
          {{ nextStageTitle }}
           <Lucide icon="ArrowRight" class="w-5 h-5 ml-2"/>
        </Button>
      </div>
      <div class="md:hidden mt-5">
        <slot name="title"/>
      </div>
    </div>
    <!-- END: BACK/NEXT BUTTONS LINE -->

    <!-- BEGIN: STEPS HEADS -->
    <div class="flex flex-nowrap mt-8 mb-5 md:mb-14 relative" :class="{ 'px-10': visibleStagesHeads.length < 4 }">
      <template v-for="({ stageOrderKey, title, hasError }, index) in visibleStagesHeads" :key="stageOrderKey">
        <div class="flex justify-end" :class="{ 'w-full': index !== 0 }">
          <transition name="unwrap">
            <hr
                v-if="index !== 0 && isStageConnected(stageOrderKey)"
                class="transition-all duration-150 mt-3 flex-grow h-[3px] bg-indigo-700 mx-2"
            />
          </transition>
          <div class="flex flex-col items-center">
            <Lucide
                :fill="
                isCurrentStage(stageOrderKey) && hasError
                  ? 'url(#errorGradient)'
                  : isCurrentStage(stageOrderKey)
                    ? 'url(#successGradient)'
                    : 'none'
              "
                :icon="isStageConnected(stageOrderKey + 1) ? 'CheckCircle2' : 'Circle'"
                class="w-8 h-8"
                :class="[
                { 'text-danger': hasError },
                { 'text-primary': isCurrentStage(stageOrderKey) && !hasError },
                { 'text-success': isStageConnected(stageOrderKey) && !isCurrentStage(stageOrderKey) && !hasError }
              ]"
            >
                <IncludeSvgRadialGradient v-if="hasError" />
            </Lucide>
            <p
                class="hidden md:block text-color-primary absolute mt-10 capitalize"
                :class="{ 'right-0': isLastChainItem(stageOrderKey), 'left-0': isFirstChainItem(stageOrderKey) }"
            >
              {{ title }}
            </p>
            <p class="md:hidden mt-4 text-2xl">{{ stageOrderKey }}</p>
          </div>
        </div>
      </template>
    </div>
    <!-- END: STEPS HEADS -->

    <!-- BEGIN: MESSAGE -->
    <!--    <Alert v-if="errorMessagesCombined.length" variant="soft-danger" class="mb-5">
          <div class="flex flex-col">
            <div class="flex items-center">
              <Lucide icon="AlertOctagon" class="w-6 h-6 mr-4 self-start" />
              <div class="flex flex-col">
                <span>To complete the process the following errors need to be corrected:</span>
                <ul class="list-disc list-inside mt-2">
                  <li v-for="(error, index) in errorMessagesCombined" :key="index">{{ error }}</li>
                </ul>
              </div>
            </div>
          </div>
        </Alert>-->
    <!-- END: MESSAGE -->

    <!-- BEGIN: COMPONENT -->
    <Transition name="fade" mode="out-in">
      <keep-alive :exclude="shouldClearNextComponentCache">
        <component ref="currentStageRef" :is="currentStage.component" :payload="currentStage.payload"/>
      </keep-alive>
    </Transition>
    <!-- END: COMPONENT -->

    <!-- BEGIN: CANCEL BUTTONS LINE -->
    <div class="pb-2 mt-auto">
      <div class="flex justify-between items-end mt-5">
        <Button variant="outline-danger" class="ml-auto" @click="onExitClickHandler">Cancel</Button>
      </div>
    </div>
    <!-- END: CANCEL BUTTONS LINE -->
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watch} from "vue"
import IncludeSvgRadialGradient from "@/assets/svg/radial-gradient.svg"
import Button from "@/components/Button"
import Lucide from "@/components/Lucide"
import type {IMultiStagesProviderProps, IStage} from "./";
// import { ErrorObject, Validation } from "@vuelidate/core"
// import Alert from "@/base-components/Alert/Alert.vue"
// import { IApplication } from "@/interfaces/application.interface.ts"

export interface MultIStagessProviderEmits {
  (e: "stageChange", stage: keyof typeof props.stages): void

  (e: "saveClick", data: Partial<any>): void
}

const props = defineProps<IMultiStagesProviderProps>()
const emit = defineEmits<MultIStagessProviderEmits>()

const currentStageRef = ref()
const currentStageName = ref<keyof typeof props.stages>(props.entrypointComponent) // the anchor
watch(currentStageName, () => {
  emit("stageChange", currentStageName.value)
})

const clientErrorMessages = ref<Array<string>>([])

const currentStage = computed<IStage>(() => props.stages[currentStageName.value])
const visibleStagesHeads = computed(() => Object.values(props.stages).filter(({isInvisible}) => !isInvisible))
const lastStageNumber = computed(() => Math.max(...Object.values(props.stages).map(({stageOrderKey}) => stageOrderKey)))
const nextStageTitle = computed(() => {
  if (currentStage.value.nextStage) return props.stages[currentStage.value.nextStage].title
})
/*
const errorMessagesCombined = computed(() => {
  const titleError = props.v$ ? props.v$.$errors.map((error) => `${error.$property}: ${error.$message}`) : []
  return [...new Set(clientErrorMessages.value.concat(titleError, props.responseErrorMessages))]
})
*/

// HACK: (KEEP-ALIVE exclusion) Visiting stages, navigating back and forth in certain components may not need to keep next one cached
const shouldClearNextComponentCache = computed(() =>
    currentStage.value.excludeNextStageFromCache && currentStage.value.nextStage ? [currentStage.value.nextStage] : []
)
const isNextButtonDisabled = computed(() => {
  if (!currentStageRef?.value) return true // disable button when ref is not available yet
  else return currentStageRef?.value?.isNextButtonDisabled ?? currentStage.value.isNextButtonDisabled
})
const isPrevButtonDisabled = computed(() => {
  return currentStage.value.isPrevButtonDisabled
})
const prevButtonTooltip = computed(() => (isPrevButtonDisabled.value ? currentStage.value.prevButtonTooltip : ""))

const toPreviousPage = async ({forceNavigation}: { forceNavigation?: boolean } = {}) => {
  const {componentV$, ...data} = currentStageRef.value || {}
  // const isComponentValid = !componentV$ || (await componentV$.value.$validate())
  // const isTitleValid = !props.v$ || (await props.v$.$validate())
  // if (isTitleValid && isComponentValid) {
  // clientErrorMessages.value = []
  if (forceNavigation || !currentStage.value.onPrevPageClick) {
    currentStageName.value = currentStage.value.prevStage!
  } else {
    const toPrev = () => (currentStageName.value = currentStage.value.prevStage!)
    // emits data handler if navigation requires it, here your api call may be implemented
    await currentStage.value.onPrevPageClick(toPrev, data)
  }
  // } else {
  // TODO: refactor messages and reinvent way of displaying
  /*clientErrorMessages.value = componentV$.value.$errors.map(
    (error: ErrorObject) => error.$propertyPath + ": " + error.$message
  )*/
  // }
}

const toNextPage = async ({forceNavigation}: { forceNavigation?: boolean } = {}) => {
  const {componentV$, ...data} = currentStageRef.value || {}
  // const isComponentValid = !componentV$ || (await componentV$.value.$validate())
  // const isTitleValid = !props.v$ || (await props.v$.$validate())
  // if (isTitleValid && isComponentValid) {
  // clientErrorMessages.value = []
  if (forceNavigation || !currentStage.value.onNextPageClick) {
    currentStageName.value = currentStage.value.nextStage!
  } else {
    // Emits data handler if navigation requires it.
    // There your API call may be implemented.
    const toNext = () => (currentStageName.value = currentStage.value.nextStage!)
    await currentStage.value.onNextPageClick(toNext, data)
  }
  /*} else {
    clientErrorMessages.value = componentV$.value.$errors.map(
      (error: ErrorObject) => error.$propertyPath + ": " + error.$message
    )
  }*/
}

const onSaveClick = async () => {
  const {componentV$, ...data} = currentStageRef.value || {}
  // const isComponentValid = !componentV$ || (await componentV$.value.$validate())
  // const isTitleValid = !props.v$ || (await props.v$.$validate())
  // if (isTitleValid && isComponentValid) {
  // clientErrorMessages.value = []
  emit("saveClick", data)
  /*} else {
    clientErrorMessages.value = componentV$.value.$errors.map(
      (error: ErrorObject) => error.$propertyPath + ": " + error.$message
    )
  }*/
}

const isFirstChainItem = (stage: number) => {
  return Object.values(props.stages)[0].stageOrderKey === stage
}
const isLastChainItem = (stage: number) => {
  return stage === lastStageNumber.value
}

const isStageConnected = (stage: number) => {
  return stage <= currentStage.value.stageOrderKey
}

const isCurrentStage = (stage: number) => {
  return stage === currentStage.value.stageOrderKey
}

const onExitClickHandler = () => {
  // Callback
  // router.push({name: props.returnRouteName})
}

watch(currentStage, (nextStage, prevStage) => {
  const isForwardDirection = nextStage.stageOrderKey > prevStage.stageOrderKey

  // Skip stage depending on navigation (next or back);
  if (currentStage.value.skip) {
    ;(isForwardDirection ? toNextPage : toPreviousPage)({forceNavigation: isForwardDirection})
  }
})

defineExpose({
  toNextPage,
  toPreviousPage
})
</script>
