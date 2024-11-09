import Button from "./Button.vue"
import {ButtonHTMLAttributes} from "vue";

export type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "pending"
  | "danger"
  | "dark"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-warning"
  | "outline-pending"
  | "outline-danger"
  | "outline-dark"
  | "soft-primary"
  | "soft-secondary"
  | "soft-success"
  | "soft-warning"
  | "soft-pending"
  | "soft-danger"
  | "soft-dark"
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"

export type Elevated = boolean
export type Size = "sm" | "lg"
export type Rounded = boolean

export interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  as?: string | object
  variant?: Variant
  elevated?: Elevated
  size?: Size
  rounded?: Rounded
}

export default Button
