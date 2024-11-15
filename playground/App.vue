<template>
  <BaseMultiStages
      class="mt-6 px-10 intro-y "
      :stages="stagesConfiguration"
      :entrypointComponent="entrypointComponent"
      @saveClick="saveClickHandler"
  >
  </BaseMultiStages>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {BaseMultiStages, IStage} from '@multi-steps-wizard'
import {Personal, Contact, Employment, Loan} from "./stages"
import type {IUserLoanData} from "./app.ts";

const STAGES = {
  'LOAN_PERSONAL': 'LOAN_PERSONAL',
  'LOAN_CONTACTS': 'LOAN_CONTACTS',
  'LOAN_EMPLOYMENT': 'LOAN_EMPLOYMENT',
  'LOAN_DETAILS': 'LOAN_DETAILS',
} as const

const entrypointComponent = STAGES.LOAN_PERSONAL

const userLoanData = reactive<IUserLoanData>({
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
  loanDetails: {
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
    nextStage: STAGES.LOAN_CONTACTS,
    prevStage: null,
    onNextPageClick: async (next: () => void, data?: object | undefined) => {
      userLoanData.personal = data as typeof userLoanData.personal
      next()
    }
  },
  [STAGES.LOAN_CONTACTS]: {
    stageOrderKey: 2,
    title: 'Contact Details',
    component: Contact,
    payload: {
      ...userLoanData.contacts
    },
    nextStage: STAGES.LOAN_EMPLOYMENT,
    prevStage: STAGES.LOAN_PERSONAL,
    onNextPageClick: (next: () => void, data?: object | undefined) => {
      userLoanData.contacts = data as typeof userLoanData.contacts
      next()
    }
  },
  [STAGES.LOAN_EMPLOYMENT]: {
    stageOrderKey: 3,
    title: 'Employment Information',
    component: Employment,
    payload: {
      ...userLoanData.employment
    },
    nextStage: STAGES.LOAN_DETAILS,
    prevStage: STAGES.LOAN_CONTACTS,
    onNextPageClick: (next: () => void, data?: object | undefined) => {
      userLoanData.employment = data as typeof userLoanData.employment
      next()
    }
  },
  [STAGES.LOAN_DETAILS]: {
    stageOrderKey: 4,
    title: 'Loan Details',
    component: Loan,
    payload: {
      ...userLoanData.loanDetails
    },
    nextStage: null,
    prevStage: STAGES.LOAN_EMPLOYMENT,
    onNextPageClick: (next: () => void, data?: object | undefined) => {
      userLoanData.loanDetails = data as typeof userLoanData.loanDetails
      next()
    }
  }
}

const saveClickHandler = (data: Partial<IUserLoanData>) => {
  const appPayload = Object.assign(userLoanData, data)
  console.log("data");
  console.log(data);
  // APICall
}
</script>