import type { Button, Input, Select, Textarea } from '@chakra-ui/react';
import { RegisterOptions, FieldValues, UseFormReturn } from 'react-hook-form';

export interface FormCoreElement {
    key: string /** To register our field */;
    label?: string /** To show labels above our field */;
    registerOptions?: RegisterOptions /** Allows us to pass additional options to the register method */;
    hidden?: boolean /** Hide the field based on a condition */;
    group?: FormElement[];
}

export interface FormInputElement extends FormCoreElement {
    type: 'input';
    inputProps?: React.ComponentProps<typeof Input>;
}

export interface FormTextareaElement extends FormCoreElement {
    type: 'textarea';
    textareaProps?: React.ComponentProps<typeof Textarea>;
}

export interface FormSelectElement extends FormCoreElement {
    type: 'select';
    choices: { label: string; value: any }[] /** Allows us to pass <options> */;
    selectProps?: React.ComponentProps<typeof Select>;
}

export interface FormDatePickerElement extends FormCoreElement {
    type: 'datepicker';
    datepickerProps?: any;
}

export interface FormGroupElement extends FormCoreElement {
    type: 'group';
}

export type FormElement =
    | FormInputElement
    | FormTextareaElement
    | FormSelectElement
    | FormDatePickerElement
    | FormGroupElement;

export type FormProps = {
    onSubmit: (data: any) => void /** Callback function after submission */;
    submitButton?: {
        text: string;
        props?: React.ComponentProps<typeof Button>;
    } /** Used to customize submit button */;
    elements: FormElement[] /** Array of fields */;
    hookForm: UseFormReturn<FieldValues, any> /** Form hook object */;
    cancelButton?: {
        text: string;
        props?: React.ComponentProps<typeof Button>;
    };
    onCancel?: () => void;
};
