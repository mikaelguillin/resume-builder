import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@components/form';
import { FormElement } from '@components/form/FormTypes';
import { useToggle } from '@utils/hooks';
import { useTranslation } from 'react-i18next';

const formElements: FormElement[] = [
    {
        key: 'fullname',
        type: 'input',
        label: 'fullname',
        inputProps: {
            id: 'fullname',
            placeholder: 'Full name',
        },
        registerOptions: {
            required: 'Full name is required',
        },
    },
    {
        key: 'jobtitle',
        type: 'input',
        label: 'jobtitle',
        inputProps: {
            id: 'jobtitle',
            placeholder: 'Job title',
        },
    },
    {
        key: 'details',
        type: 'group',
        group: [
            {
                key: 'email',
                type: 'input',
                label: 'email',
                inputProps: {
                    id: 'email',
                    placeholder: 'E-mail',
                },
            },
            {
                key: 'phone',
                type: 'input',
                label: 'phone',
                inputProps: {
                    id: 'phone',
                    placeholder: 'Phone',
                },
            },
        ],
    },
    {
        key: 'address',
        type: 'input',
        label: 'address',
        inputProps: {
            id: 'address',
            placeholder: 'Address',
        },
    },
];

export const PersonalDetails = () => {
    const hookForm = useForm();
    const [editMode, toggleEditMode] = useToggle(false);
    const { t } = useTranslation();

    const handleCancelClick = () => {
        toggleEditMode();
    };

    const handleSubmitClick = () => {};

    const handleAddDetailsClick = () => {
        toggleEditMode();
    };

    return (
        <div className="box">
            <h2>{t('personaldetails')}</h2>

            {editMode ? (
                <Form
                    hookForm={hookForm}
                    elements={formElements}
                    onSubmit={handleSubmitClick}
                    submitButton={{
                        text: 'Save',
                    }}
                    onCancel={handleCancelClick}
                    cancelButton={{
                        text: 'Cancel',
                    }}
                />
            ) : (
                <div>
                    <button
                        type="button"
                        className="button"
                        onClick={handleAddDetailsClick}
                    >
                        Add personal details
                    </button>
                </div>
            )}
        </div>
    );
};
