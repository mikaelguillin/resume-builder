import React from 'react';
import { FormInputElement } from '../FormTypes';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
    const required = element.registerOptions?.required;
    const { t } = useTranslation();

    return (
        <>
            {element.label && (
                <label htmlFor={element.inputProps?.id}>
                    {t(element.label)}
                    {required ? '*' : ''}
                </label>
            )}
            <input
                {...element.inputProps}
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
        </>
    );
};
