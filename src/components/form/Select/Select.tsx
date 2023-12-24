import { FormSelectElement } from '../FormTypes';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export const Select = ({
    element,
    hookForm,
}: {
    element: FormSelectElement;
    hookForm: UseFormReturn<FieldValues, any>;
}) => {
    const { register } = hookForm;
    const required = element.registerOptions?.required;
    return (
        <select
            {...element.selectProps}
            required={required ? true : false}
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
        </select>
    );
};
