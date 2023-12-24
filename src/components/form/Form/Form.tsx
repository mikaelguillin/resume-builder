import React from 'react';
import { RenderFormControl } from '../FormElement';
import { FormProps } from '../FormTypes';
import { useTranslation } from 'react-i18next';

export const Form = ({
    elements,
    onSubmit,
    submitButton,
    onCancel,
    cancelButton,
    hookForm,
}: FormProps) => {
    const { t } = useTranslation();
    return (
        <form onSubmit={hookForm.handleSubmit(onSubmit)} noValidate>
            <div>
                {elements.map((res, key) => {
                    if (res.group) {
                        return (
                            <div
                                key={`form-element-${res.key}-${key}`}
                                className="formGroup"
                            >
                                {res.group.map((resItem, keyItem) => (
                                    <div
                                        key={`form-element-${resItem.key}-${keyItem}`}
                                        className="formControl"
                                    >
                                        <RenderFormControl
                                            element={resItem}
                                            hookForm={hookForm}
                                        />
                                    </div>
                                ))}
                            </div>
                        );
                    }
                    return (
                        <div
                            key={`form-element-${res.key}-${key}`}
                            className="formControl"
                        >
                            <RenderFormControl
                                element={res}
                                hookForm={hookForm}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="buttons">
                {onCancel && (
                    <button
                        className="button"
                        type="button"
                        onClick={onCancel}
                        {...cancelButton?.props}
                    >
                        {cancelButton?.text || t('cancel')}
                    </button>
                )}
                <button
                    className="button"
                    type="submit"
                    {...submitButton?.props}
                >
                    {submitButton?.text || t('save')}
                </button>
            </div>
        </form>
    );
};
