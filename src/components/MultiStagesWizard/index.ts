import BaseMultiStages from "./BaseMultiStages.vue"
import {useWizard} from "./useWizard"
import type {Component, MaybeRef} from "vue";

/**
 * MultiStagesWizard component props
*/
export interface IMultiStagesProviderProps<T extends object> {
  /** Object with stages */
  stages: Record<string, IStage<T>>
  /** The component to start the wizard. */
  entrypointComponent: string
}

/**
 * Represents a single stage in the MultiStagesWizard
 */
export interface IStage<T extends object> {
  /** The position of the stage in the wizard flow */
  stageOrderKey: number;
  /** The title displayed for the stage */
  title: string;
  /** The data related to the stage */
  payload: object;
  /** The Vue component rendered for this stage */
  component: Component;
  /** The key for the next stage in the flow */
  nextStage: string | null;
  /** The key for the previous stage in the flow */
  prevStage: string | null;
  /**
   * Optional function that runs when the "Next" button is clicked.
   * It can be asynchronous and receives the next callback.
   */
  onNextPageClick?: (next: () => void, data: T & { [key: string]: unknown }) => Promise<unknown> | void;
  /**
   * Optional function that runs when the "Previous" button is clicked
   */
  onPrevPageClick?: (prev: () => void, data: T & { [key: string]: unknown }) => Promise<unknown> | void;
  /** Disables the "Previous" button if true */
  isPrevButtonDisabled?: boolean;
  /** Disables the "Next" button if true */
  isNextButtonDisabled?: boolean;
  /** If true, the stage will not be rendered */
  isInvisible?: boolean;
  /** If true, the next stage is excluded from the cache */
  excludeNextStageFromCache?: boolean;
  /** Determines whether the stage should be skipped (e.g., based on previous data or logic) */
  skip?: MaybeRef<boolean>;
  /** Tooltip text for the "Previous" button */
  prevButtonTooltip?: string;
  /** If true, this marks the stage with an error */
  hasError?: boolean;
}

export { useWizard, BaseMultiStages }
export default BaseMultiStages