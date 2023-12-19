import React from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { FormElement } from './FormTypes';
import { Input } from './Input/Input';
import { Select } from './Select/Select';
import { Textarea } from './Textarea/Textarea';

export const RenderFormControl = (props: {
    element: FormElement;
    hookForm: UseFormReturn<FieldValues, any>;
}) => {
    const { element, hookForm } = props;
    if (element.hidden)
        return <React.Fragment />; /** Don't render hidden fields */
    switch (element.type) {
        case 'input':
            return <Input element={element} hookForm={hookForm} />;
        case 'textarea':
            return <Textarea element={element} hookForm={hookForm} />;
        case 'select':
            return <Select element={element} hookForm={hookForm} />;
        case 'datepicker':
            return <p>Date Picker</p>;
    }
};
