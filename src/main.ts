import { defineCustomElement, App } from 'vue'
import MultiStagesProvider from './components/MultiStagesProvider'
import type { IMultiStagesProviderProps, IStage } from "@/components/MultiStagesProvider";
import "./assets/main.css"

const MultiStagesProviderElement = defineCustomElement(MultiStagesProvider)

export { MultiStagesProviderElement, MultiStagesProvider }

export function install(app: App) {
  app.component('MultiStagesProvider', MultiStagesProvider)
}
export type { IMultiStagesProviderProps, IStage }