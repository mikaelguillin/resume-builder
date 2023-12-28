import React from 'react';
import { FormInputElement } from '../FormTypes';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as InputCkrUI,
} from '@chakra-ui/react';

export const Input = ({
    element,
    hookForm,
}: {
    element: FormInputElement /** Field of type input */;
    hookForm: UseFormReturn<
        FieldValues,
        any
    > /** Object returned from useForm() hook */;
}) => {
    const { register } = hookForm;
    const required = element.registerOptions?.required ? true : false;
    const error = hookForm.formState.errors[element.key];
    const isInvalid = error ? true : false;
    const { t } = useTranslation();

    return (
        <FormControl isRequired={required} isInvalid={isInvalid}>
            {element.label && (
                <FormLabel htmlFor={element.inputProps?.id}>
                    {t(element.label)}
                </FormLabel>
            )}

            <InputCkrUI
                {...element.inputProps}
                required={required}
                {...register(element.key, {
                    ...element.registerOptions,
                })}
                autoComplete="off"
            />
            {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    );
};
