import { Heading } from '@chakra-ui/react';
import { FormElement } from '../form/FormTypes';
import type { EducationItem } from '@store/resume/resume.slice';

const formElements: FormElement[] = [
    {
        key: 'id',
        type: 'input',
        inputProps: {
            type: 'hidden',
        },
    },
    {
        key: 'degree',
        type: 'input',
        label: 'education.degree',
        inputProps: {
            id: 'degree',
            placeholder: 'Degree',
        },
        registerOptions: {
            required: 'Degree is required',
        },
    },
    {
        key: 'school',
        type: 'input',
        label: 'education.school',
        inputProps: {
            id: 'school',
            placeholder: 'School',
        },
        registerOptions: {
            required: 'School is required',
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
        label: 'Description',
        textareaProps: {
            id: 'description',
            placeholder: 'Description',
        },
    },
];

export const configSection = {
    key: 'education',
    title: 'education.title',
    addItemLabel: 'education.additemlabel',
    formElements,
    icon: 'MdSchool',
};

export const Item = ({ degree, school, city, country }: EducationItem) => {
    return (
        <div>
            <Heading fontSize="xl" as="h3">
                {degree}, <i>{school}</i>
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
