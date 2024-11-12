<template>
  <div>
    <MultiStagesProvider
        ref="multiStepsProviderRef"
        class="mt-8 intro-y"
        :stages="stagesConfiguration"
        :entrypointComponent="currentStage"
    >
    </MultiStagesProvider>
  </div>
</template>

<!--
returnRouteName="home"
:responseErrorMessages="responseErrorMessages"
:v$="v$"
@saveClick="saveClickHandler"-->

<script setup lang="ts">
import {reactive, ref} from "vue";
import {MultiStagesProviderElement, MultiStagesProvider, IStage} from '@multi-steps-wizard'
import {Personal, Contact, Employment, Loan} from "./stages"

// To register as framework-agnostic Web component
if (!customElements.get('multi-stages-wizard')) {
  customElements.define('multi-stages-wizard', MultiStagesProviderElement)
}

const STAGES = {
  'LOAN_PERSONAL': 'LOAN_PERSONAL',
  'LOAN_CONTACTS': 'LOAN_CONTACTS',
  'LOAN_EMPLOYMENT': 'LOAN_EMPLOYMENT',
  'LOAN_DETAILS': 'LOAN_DETAILS',
} as const

const currentStage = ref(STAGES.LOAN_PERSONAL)

const userLoanData = reactive({
  personal: {
    fullName: "",
    age: 0,
    dateOfBirth: "",
    skipNextStage: false
  },
  contacts: {
    email: "",
    phoneNumber: "",
    address: "",
  },
  employment: {
    employerName: "",
    jobTitle: "",
    annualIncome: "",
  },
  loadDetails: {
    loanAmount: "",
    loanPurpose: "",
    loanTerm: ""
  }
})

const stagesConfiguration: Record<typeof STAGES[keyof typeof STAGES], IStage> = {
  [STAGES.LOAN_PERSONAL]: {
    stageOrderKey: 1,
    component: Personal,
    payload: {
     ...userLoanData.personal
    },
    skip: userLoanData.personal.skipNextStage,
    title: 'Personal Information',
    // isValid: () => form.firstName && form.lastName,
    nextStage: STAGES.LOAN_CONTACTS,
    prevStage: null
  },
  [STAGES.LOAN_CONTACTS]: {
    stageOrderKey: 2,
    title: 'Contact Details',
    component: Contact,
    payload: {
      ...userLoanData.contacts
    },
    // isValid: () => form.address?.trim() !== '',
    nextStage: STAGES.LOAN_EMPLOYMENT,
    prevStage: STAGES.LOAN_PERSONAL
  },
  [STAGES.LOAN_EMPLOYMENT]: {
    stageOrderKey: 3,
    title: 'Employment Information',
    component: Employment,
    payload: {
      ...userLoanData.employment
    },
    // isValid: () => form.hasAcceptedTerms === true,
    nextStage: STAGES.LOAN_DETAILS,
    prevStage: STAGES.LOAN_CONTACTS
  },
  [STAGES.LOAN_DETAILS]: {
    stageOrderKey: 4,
    title: 'Loan Details',
    component: Loan,
    payload: {
      ...userLoanData.loadDetails
    },
    // isValid: () => form.paymentMethod && ['credit-card', 'paypal'].includes(form.paymentMethod),
    nextStage: null,
    prevStage: STAGES.LOAN_EMPLOYMENT
  }
}
</script>