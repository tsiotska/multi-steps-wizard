import { defineCustomElement } from 'vue'
import MultiStepsProvider from './components/MultiStepsWizard'

const MultiStepsProviderElement = defineCustomElement(MultiStepsProvider)

customElements.define('multi-steps-provider', MultiStepsProviderElement)

export { MultiStepsProviderElement }
