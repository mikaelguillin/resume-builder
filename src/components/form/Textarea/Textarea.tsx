import { useTranslation } from 'react-i18next';
import { FormTextareaElement } from '../FormTypes';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import {
    FormControl,
    FormLabel,
    Textarea as TextareaCkrUI,
} from '@chakra-ui/react';

export const Textarea = ({
    element,
    hookForm,
}: {
    element: FormTextareaElement;
    hookForm: UseFormReturn<FieldValues, any>;
}) => {
    const { register } = hookForm;
    const required = element.registerOptions?.required ? true : false;
    const { t } = useTranslation();

    return (
        <FormControl>
            {element.label && (
                <FormLabel htmlFor={element.textareaProps?.id}>
                    {t(element.label)}
                </FormLabel>
            )}
            <TextareaCkrUI
                {...element.textareaProps}
                required={required ? true : false}
                {...register(element.key, {
                    ...element.registerOptions,
                })}
            />
            {hookForm.formState.errors[element.key] && (
                <div className="formError" role="alert">
                    {hookForm.formState.errors[element.key].message}
                </div>
            )}
        </FormControl>
    );
};
