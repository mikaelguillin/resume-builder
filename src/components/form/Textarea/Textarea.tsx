import { useTranslation } from 'react-i18next';
import { FormTextareaElement } from '../FormTypes';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export const Textarea = ({
    element,
    hookForm,
}: {
    element: FormTextareaElement;
    hookForm: UseFormReturn<FieldValues, any>;
}) => {
    const { register } = hookForm;
    const required = element.registerOptions?.required;
    const { t } = useTranslation();

    return (
        <>
            {element.label && (
                <label htmlFor={element.textareaProps?.id}>
                    {t(element.label)}
                    {required ? '*' : ''}
                </label>
            )}
            <textarea
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
        </>
    );
};
