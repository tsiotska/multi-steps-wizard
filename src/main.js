import { defineCustomElement } from 'vue'
import MultiStepsProvider from './MultiStepsProvider.vue'

const MultiStepsProviderElement = defineCustomElement(MultiStepsProvider)

customElements.define('multi-steps-provider', MultiStepsProviderElement)

export { MultiStepsProviderElement }
