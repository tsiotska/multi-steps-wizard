import MultiStagesProvider from "./MultiStagesProvider.vue"
import type {Component} from "vue";

/**
 * MultIStagessProvider component props
 * @typedef {Object} IMultiStagesProviderProps
 * @property {Record<string, IStage>} stages - Defines the stages for the wizard.
 * @property {string} entrypointComponent - The component to start the wizard.
 */
export interface IMultiStagesProviderProps {
  stages: Record<string, IStage>
  entrypointComponent: string
  // returnRouteName: string
  // responseErrorMessages: Array<string>
  // v$?: Validation
}

export interface IStage {
  stageOrderKey: number
  title: string
  payload: object
  component: Component
  nextStage: string | null
  prevStage: string | null
  onNextPageClick?: (next: () => void, data?: object) => Promise<unknown> | void
  onPrevPageClick?: (prev: () => void, data?: object) => Promise<unknown> | void
  isPrevButtonDisabled?: boolean
  isNextButtonDisabled?: boolean
  isInvisible?: boolean
  excludeNextStageFromCache?: boolean
  skip?: boolean
  prevButtonTooltip?: string
  hasError?: boolean
}

export default MultiStagesProvider
