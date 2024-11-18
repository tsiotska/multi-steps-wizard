<template>
  <BaseMultiStages
      class="mt-6 px-10 intro-y "
      :stages="stagesConfiguration"
      :entrypointComponent="entrypointComponent"
      @saveClick="saveClickHandler"
      @cancelClick="cancelClickHandler"
  >
  </BaseMultiStages>
</template>

<script setup lang="ts">
import {computed, reactive} from "vue";
import {BaseMultiStages, IStage} from '@multi-steps-wizard'
import {Personal, Contact, Employment, Loan} from "./stages"
import type {IUserLoanData} from "./app.ts";

const STAGES = {
  'LOAN_PERSONAL': 'loanPersonal',
  'LOAN_CONTACTS': 'loanContacts',
  'LOAN_EMPLOYMENT': 'loanEmployment',
  'LOAN_DETAILS': 'loanDetails',
} as const

const entrypointComponent = STAGES.LOAN_PERSONAL

const userLoanData = reactive<IUserLoanData>({
  personal: {
    fullName: "",
    age: 0,
    dateOfBirth: "",
    skipNextStage: false,
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

const shouldSkipContacts = computed(() => Boolean(userLoanData.personal.skipNextStage))

const stagesConfiguration: Record<typeof STAGES[keyof typeof STAGES], IStage<Partial<typeof userLoanData>>> = (
    {
      [STAGES.LOAN_PERSONAL]: {
        stageOrderKey: 1,
        component: Personal,
        payload: {
          ...userLoanData.personal
        },
        excludeNextStageFromCache: true,
        title: 'Personal Information',
        nextStage: STAGES.LOAN_CONTACTS,
        prevStage: null,
        onNextPageClick: async (next: () => void, {personal}) => {
          userLoanData.personal = personal!
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
        skip: shouldSkipContacts,
        nextStage: STAGES.LOAN_EMPLOYMENT,
        prevStage: STAGES.LOAN_PERSONAL,
        onNextPageClick: (next: () => void, {contacts}) => {
          userLoanData.contacts = contacts!
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
        onNextPageClick: (next: () => void, {employment}) => {
          userLoanData.employment = employment!
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
        onNextPageClick: (next: () => void, {loanDetails}) => {
          userLoanData.loanDetails = loanDetails!
          next()
        }
      }
    }
)

const saveClickHandler = (data: Partial<IUserLoanData>) => {
  const appPayload = Object.assign(userLoanData, data)
  console.log("data");
  console.log(data);
  // API call.
}

const cancelClickHandler = () => {
  // Route redirect.
}
</script>