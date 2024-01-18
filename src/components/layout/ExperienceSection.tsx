import { Heading } from '@chakra-ui/react';
import { FormElement } from '../form/FormTypes';

interface ExperienceItemProps {
    jobTitle: string;
    employer: string;
    city: string;
    country: string;
    description: string;
}

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

export const Item = ({
    jobTitle,
    employer,
    city,
    country,
    description,
}: ExperienceItemProps) => {
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
                {/* {description && <p>{description}</p>} */}
            </div>
        </div>
    );
};
