import { FormSelectElement } from '../FormTypes';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Select as SelectCkrUI,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const Select = ({
    element,
    hookForm,
}: {
    element: FormSelectElement;
    hookForm: UseFormReturn<FieldValues, any>;
}) => {
    const { register } = hookForm;
    const required = element.registerOptions?.required ? true : false;
    const error = hookForm.formState.errors[element.key];
    const isInvalid = error ? true : false;
    const { t } = useTranslation();
    return (
        <FormControl isRequired={required} isInvalid={isInvalid}>
            {element.label && (
                <FormLabel htmlFor={element.selectProps?.id}>
                    {t(element.label)}
                </FormLabel>
            )}

            <SelectCkrUI
                {...element.selectProps}
                required={required}
                {...register(element.key, {
                    ...element.registerOptions,
                })}
            >
                {element.selectProps?.placeholder && (
                    <option value="" hidden selected disabled>
                        {element.selectProps.placeholder}
                    </option>
                )}
                {element.choices.map((res, key) => (
                    <option
                        value={res.value}
                        key={`select-${element.key}-option-${key}`}
                    >
                        {res.label}
                    </option>
                ))}
            </SelectCkrUI>
            {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    );
};
