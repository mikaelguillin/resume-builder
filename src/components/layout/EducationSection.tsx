import { Heading } from '@chakra-ui/react';
import { FormElement } from '../form/FormTypes';

export interface EducationItemProps {
    degree: string;
    school: string;
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

export const Item = ({
    degree,
    school,
    city,
    country,
    description,
}: EducationItemProps) => {
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
                {/* {description && <p>{description}</p>} */}
            </div>
        </div>
    );
};
