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
        <Button variant="outline-danger" class="ml-auto" @click="emit('cancelClick')">Cancel</Button>
      </div>
    </div>
    <!-- END: CANCEL BUTTONS LINE -->
  </div>
</template>

<script setup lang="ts">
import {watch, useTemplateRef, computed} from "vue"
import IncludeSvgRadialGradient from "@/assets/svg/radial-gradient.svg"
import Button from "@/components/Button"
import Lucide from "@/components/Lucide"
import {IMultiStagesProviderProps, useWizard} from "./";

export interface MultiStagesProviderEmits {
  (e: "stageChange", stage: keyof typeof props.stages): void
  (e: "saveClick", data: object): void
  (e: "cancelClick"): void
}

const props = defineProps<IMultiStagesProviderProps<Record<string, object>>>()
const emit = defineEmits<MultiStagesProviderEmits>()

const currentStageRef = useTemplateRef("currentStageRef")

const stages = computed(() => props.stages ?? {})

const {
  currentStageName,
  currentStage,
  visibleStagesHeads,
  shouldClearNextComponentCache,
  isNextButtonDisabled,
  isPrevButtonDisabled,
  prevButtonTooltip,
  nextStageTitle,
  isFirstChainItem,
  isLastChainItem,
  isStageConnected,
  isCurrentStage,
  toPreviousPage,
  toNextPage,
} = useWizard(stages, props.entrypointComponent, currentStageRef);

watch(currentStageName, () => {
  emit("stageChange", currentStageName.value)
})

const onSaveClick = async () => {
  const {...data} = currentStageRef.value || {}
  emit("saveClick", data)
}
</script>
