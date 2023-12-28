import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@components/form';
import { FormElement } from '@components/form/FormTypes';
import { useToggle } from '@utils/hooks';
import { useTranslation } from 'react-i18next';
import { Box, Button, Heading } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
    editPersonalDetails,
    selectPersonalDetails,
} from '@store/resume/resume.slice';
import { saveState } from '@/browser-storage';
import store, { AppState } from '@store/store';

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
        key: 'jobTitle',
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
    const dispatch = useDispatch();
    const personalDetails = useSelector((state: AppState) =>
        selectPersonalDetails(state),
    );
    const { fullname, jobTitle, email, address } = personalDetails;

    const handleCancelClick = () => {
        toggleEditMode();
    };

    const handleSubmitClick = () => {
        dispatch(editPersonalDetails(hookForm.getValues()));
        toggleEditMode();
        saveState(store.getState());
    };

    const handleAddDetailsClick = () => {
        toggleEditMode();
        Object.entries(personalDetails).forEach(([key, value]) => {
            hookForm.setValue(key, value);
        });
    };

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            bg="white"
            boxShadow="base"
        >
            <Heading fontSize="3xl" as="h2" marginBottom={3}>
                {t('personaldetails')}
            </Heading>

            {editMode ? (
                <Form
                    hookForm={hookForm}
                    elements={formElements}
                    onSubmit={handleSubmitClick}
                    onCancel={handleCancelClick}
                />
            ) : (
                <>
                    <div>
                        {fullname && (
                            <Heading fontSize="xl">{fullname}</Heading>
                        )}
                        {jobTitle && <div>{jobTitle}</div>}
                        {email && <div>{email}</div>}
                        {address && <div>{address}</div>}
                    </div>
                    <Button
                        marginTop={3}
                        colorScheme="blue"
                        onClick={handleAddDetailsClick}
                    >
                        Add personal details
                    </Button>
                </>
            )}
        </Box>
    );
};
