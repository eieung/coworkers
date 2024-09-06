import { ButtonProps } from '@/components/common/button';

export interface InputField {
  name?: string;
  height?: string;
  type?: string;
  label?: string;
  placeholder?: string;
}

export interface Action {
  title: string;
  description?: string;
  buttons?: ButtonProps[];
  inputs?: InputField[];
}
