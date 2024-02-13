import { Heading } from '@chakra-ui/react';
import { FormElement } from '../form/FormTypes';
import type { ExperienceItem } from '@store/resume/resume.slice';

const formElements: FormElement[] = [
    {
        key: 'id',
        type: 'input',
        inputProps: {
            type: 'hidden',
        },
    },
    {
        key: 'jobTitle',
        type: 'input',
        label: 'professionalexperience.jobtitle',
        inputProps: {
            id: 'jobTitle',
            placeholder: 'Job Title',
        },
        registerOptions: {
            required: 'Job title is required',
        },
    },
    {
        key: 'employer',
        type: 'input',
        label: 'professionalexperience.employer',
        inputProps: {
            id: 'employer',
            placeholder: 'Employer',
        },
        registerOptions: {
            required: 'Employer is required',
        },
    },
    {
        key: 'location',
        type: 'group',
        group: [
            {
                key: 'city',
                type: 'input',
                label: 'city',
                inputProps: {
                    id: 'city',
                    placeholder: 'City',
                },
            },
            {
                key: 'country',
                type: 'input',
                label: 'country',
                inputProps: {
                    id: 'country',
                    placeholder: 'Country',
                },
            },
        ],
    },
    {
        key: 'date',
        type: 'group',
        group: [
            {
                key: 'startDate',
                type: 'datepicker',
                label: 'startDate',
                yearsRegisterOptions: {
                    required: 'Start year is required',
                },
            },
            {
                key: 'endDate',
                type: 'datepicker',
                label: 'endDate',
                yearsRegisterOptions: {
                    required: 'Start year is required',
                },
            },
        ],
    },
    {
        key: 'description',
        type: 'textarea',
        label: 'description',
        textareaProps: {
            id: 'description',
            placeholder: 'Description',
        },
    },
];

export const configSection = {
    key: 'experience',
    title: 'professionalexperience.title',
    addItemLabel: 'professionalexperience.additemlabel',
    formElements,
    icon: 'MdWork',
};

export const Item = ({ jobTitle, employer, city, country }: ExperienceItem) => {
    return (
        <div>
            <Heading fontSize="xl" as="h3">
                {jobTitle}, <i>{employer}</i>
            </Heading>
            <div>
                {(city || country) && (
                    <div>
                        {city}, {country}
                    </div>
                )}
            </div>
        </div>
    );
};
