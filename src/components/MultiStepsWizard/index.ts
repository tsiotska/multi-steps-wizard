import Wizard from "./MultiStepsProvider.vue"
import type {Component} from "vue";

/**
 * MultiStepsProvider component props
 * @typedef {Object} MultiStepsProviderProps
 * @property {Record<string, Stage>} stages - Defines the stages for the wizard.
 * @property {string} entrypointComponent - The component to start the wizard.
 * @property {string} returnRouteName - Route to navigate to after completion.
 */
export interface MultiStepsProviderProps {
  stages: Record<string, Stage>
  entrypointComponent: string
  returnRouteName: string
  // responseErrorMessages: Array<string>
  // v$?: Validation
}

export interface Stage {
  stage: number
  title: string
  payload: object
  component: Component
  next: string
  previous: string
  onNextPageClick: (next: () => void, data?: object) => Promise<unknown>
  onPrevPageClick: (prev: () => void, data?: object) => Promise<unknown>
  isPrevButtonDisabled: boolean
  isNextButtonDisabled: boolean
  isInvisible: boolean
  excludeNextStageFromCache: boolean
  skip: boolean
  prevButtonTooltip: string
  hasError: boolean
}

export default Wizard
