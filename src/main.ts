import {App} from 'vue'
import {BaseMultiStages, useWizard} from './components/MultiStagesWizard'
import type {IMultiStagesProviderProps, IStage} from "src/components/MultiStagesWizard";
import "./assets/main.css"

// const MultiStagesProviderElement = defineCustomElement(MultiStagesWizard)

export {BaseMultiStages, useWizard}

export function install(app: App) {
  app.component('MultiStagesWizard', BaseMultiStages)
}

export type {IMultiStagesProviderProps, IStage}