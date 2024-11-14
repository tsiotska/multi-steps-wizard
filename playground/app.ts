export interface IUserLoanData {
  personal: {
    fullName: string;
    age: number;
    dateOfBirth: string;
    skipNextStage: boolean;
  }
  contacts: {
    email: string;
    phoneNumber: string;
    address: string;
  }
  employment: {
    employerName: string;
    jobTitle: string;
    annualIncome: string;
  }
  loanDetails: {
    loanAmount: string;
    loanPurpose: string;
    loanTerm: string;
  }
}