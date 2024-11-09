import {MultiStepsProviderProps} from "@multi-steps-wizard";

declare module 'vue' {
  export interface GlobalComponents {
    'multi-steps-wizard': MultiStepsProviderProps;
  }
}