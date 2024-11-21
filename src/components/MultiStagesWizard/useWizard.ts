import {ref, computed, ComputedRef, ShallowRef, unref, watch} from 'vue'
import { IStage } from '@multi-steps-wizard'

export function useWizard<T extends object>(stages: ComputedRef<Record<string, IStage<T>>>, entrypointComponent: string, currentStageRef: Readonly<ShallowRef>) {
  /* The anchor. */
  const currentStageName = ref<keyof typeof stages.value>(entrypointComponent)

  /* Current stage configuration. */
  const currentStage = computed(() => stages.value[currentStageName.value])

  /* Display heads for visible stages. */
  const visibleStagesHeads = computed(() =>
    Object.values(stages.value).filter(({ isInvisible }) => !isInvisible)
  )

  /* Dynamically clear cache for next stage. */
  const shouldClearNextComponentCache = computed(() =>
    currentStage.value.excludeNextStageFromCache && currentStage.value.nextStage
      ? [currentStage.value.nextStage]
      : []
  )

  /* Dynamically enable/disable next button. */
  const isNextButtonDisabled = computed(() => {
    const currentRefValue = currentStageRef?.value
    return currentRefValue
      ? currentRefValue.isNextButtonDisabled ?? currentStage.value.isNextButtonDisabled
      : true; // Disable when not available
  })

  /* Determine if previous button is disabled. */
  const isPrevButtonDisabled = computed(() => currentStage.value.isPrevButtonDisabled)

  /* Tooltip for the previous button when disabled. */
  const prevButtonTooltip = computed(() =>
    isPrevButtonDisabled.value ? currentStage.value.prevButtonTooltip : ''
  )

  /* Title for the next stage. */
  const nextStageTitle = computed(() => {
    const nextStageName = currentStage.value.nextStage
    return nextStageName ? stages.value[nextStageName].title : undefined
  })

  /* Last stage key. */
  const lastStageNumber = computed(() =>
    Math.max(...Object.values(stages.value).map(({ stageOrderKey }) => stageOrderKey))
  );

  /* Check if the stage is the first in the chain. */
  const isFirstChainItem = (stageKey: number) =>
    Object.values(stages.value)[0].stageOrderKey === stageKey

  /* Check if the stage is the last in the chain. */
  const isLastChainItem = (stageKey: number) => stageKey === lastStageNumber.value

  /* Check if the stage is connected to the current one. */
  const isStageConnected = (stageKey: number) =>
    stageKey <= currentStage.value.stageOrderKey

  /* Check if the stage is the current stage. */
  const isCurrentStage = (stageKey: number) =>
    stageKey === currentStage.value.stageOrderKey

  /* Navigate to the previous page. */
  const toPreviousPage = async ({ forceNavigation }: { forceNavigation?: boolean } = {}) => {
    const { ...data } = currentStageRef.value || {}
    const toPrev = () => {
      currentStageName.value = currentStage.value.prevStage!
    }

    if (forceNavigation || !currentStage.value.onPrevPageClick) {
      toPrev()
      return
    }

    // Handle custom navigation logic with provided handler
    await currentStage.value.onPrevPageClick(toPrev, data)
  }

  /* Navigate to the next page. */
  const toNextPage = async ({ forceNavigation }: { forceNavigation?: boolean } = {}) => {
    const { validate, ...data } = currentStageRef.value || {}
    const toNext = () => {
      currentStageName.value = currentStage.value.nextStage!
    }

    if (forceNavigation) {
      toNext()
      return
    }

    // If validator is provided and data is invalid
    if (validate && !(await validate())) return

    if (!currentStage.value.onNextPageClick) {
      toNext()
      return
    }

    // Handle custom navigation logic with provided handler
    await currentStage.value.onNextPageClick(toNext, data)
  };

  watch(currentStage, (nextStage, prevStage) => {
    const isForwardDirection = nextStage.stageOrderKey > prevStage.stageOrderKey

    // Skip stage depending on navigation (next or back);
    if (unref(currentStage.value.skip)) {
      const animationDelayDuration = currentStage.value.isInvisible ? 0 : 150

      setTimeout(() => {
        ;(isForwardDirection ? toNextPage : toPreviousPage)({forceNavigation: isForwardDirection})
      }, animationDelayDuration)
    }
  })

  return {
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
  }
}