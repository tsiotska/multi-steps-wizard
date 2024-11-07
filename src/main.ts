import { defineCustomElement, App } from 'vue'
import MultiStepsProvider from './components/MultiStepsWizard'

const MultiStepsProviderElement = defineCustomElement(MultiStepsProvider)

export { MultiStepsProviderElement, MultiStepsProvider }

export function install(app: App) {
  app.component('MultiStepsProvider', MultiStepsProvider)
}
