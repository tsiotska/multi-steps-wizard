import {ref, computed, ShallowRef} from 'vue';
import {IStage} from "@multi-steps-wizard";

export function useWizard(stages: Record<string, IStage>, entrypointComponent: string, currentStageRef: Readonly<ShallowRef>) {
  /* The anchor. */
  const currentStageName = ref<keyof typeof stages>(entrypointComponent)

  /* Current stage config. */
  const currentStage = computed(() => stages[currentStageName.value]);

  /* It allows to display single head for the stages. */
  const visibleStagesHeads = computed(() =>
    Object.values(stages).filter(({isInvisible}) => !isInvisible)
  );

  // HACK: (keep-alive exclusion) Allows to dynamically clear cached data of stage if navigated back
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

  const prevButtonTooltip = computed(() =>
    (isPrevButtonDisabled.value ? currentStage.value.prevButtonTooltip : "")
  )

  const nextStageTitle = computed(() => {
    if (currentStage.value.nextStage) return stages[currentStage.value.nextStage].title
  })

  const lastStageNumber = computed(() =>
    Math.max(...Object.values(stages).map(({stageOrderKey}) => stageOrderKey))
  )

  const isFirstChainItem = (stageKey: number) => {
    return Object.values(stages)[0].stageOrderKey === stageKey
  }

  const isLastChainItem = (stageKey: number) => {
    return stageKey === lastStageNumber.value
  }

  const isStageConnected = (stageKey: number) => {
    return stageKey <= currentStage.value.stageOrderKey
  }

  const isCurrentStage = (stageKey: number) => {
    return stageKey === currentStage.value.stageOrderKey
  }

  const toPreviousPage = async ({forceNavigation}: { forceNavigation?: boolean } = {}) => {
    const {...data} = currentStageRef.value || {}
    const toPrev = () => (currentStageName.value = currentStage.value.prevStage!);

    // Handle forced navigation or when no handler is defined
    if (forceNavigation || !currentStage.value.onPrevPageClick) {
      toPrev()
      return
    }

    // Handle custom navigation logic with provided handler
    await currentStage.value.onPrevPageClick(toPrev, data)
  }

  const toNextPage = async ({forceNavigation}: { forceNavigation?: boolean } = {}) => {
    const {validate, ...data} = currentStageRef.value || {}
    const toNext = () => (currentStageName.value = currentStage.value.nextStage!)

    // Handle forced navigation or when no handler is defined
    if (forceNavigation) {
      toNext()
      return
    }

    // If validator is provided and data is valid
    if (validate && !(await validate())) return

    if (!currentStage.value.onNextPageClick) {
      toNext()
      return
    }

    // Handle custom navigation logic with provided handler
    await currentStage.value.onNextPageClick(toNext, data)
  }

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
  };
}