import BaseMultiStages from "./BaseMultiStages.vue"
import {useWizard} from "./useWizard"
import type {Component} from "vue";

/**
 * MultiStagesWizard component props
*/
export interface IMultiStagesProviderProps<T extends object> {
  /** Object with stages */
  stages: Record<string, IStage<T>>
  /** The component to start the wizard. */
  entrypointComponent: string
}

export interface IStage<T extends object> {
  stageOrderKey: number
  title: string
  payload: object
  component: Component
  nextStage: string | null
  prevStage: string | null
  onNextPageClick?: (next: () => void, data: T & { [key: string]: unknown }) => Promise<unknown> | void
  onPrevPageClick?: (prev: () => void, data: T & { [key: string]: unknown }) => Promise<unknown> | void
  isPrevButtonDisabled?: boolean
  isNextButtonDisabled?: boolean
  isInvisible?: boolean
  excludeNextStageFromCache?: boolean
  skip?: boolean
  prevButtonTooltip?: string
  hasError?: boolean
}

export { useWizard, BaseMultiStages }
export default BaseMultiStages