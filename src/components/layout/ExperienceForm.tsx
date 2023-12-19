import { FormElement } from '../form/FormTypes';

export const configSection = {
    key: 'experience',
    title: 'professionalexperience.title',
    addItemLabel: 'professionalexperience.additemlabel',
};

export const formElements: FormElement[] = [
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

interface ExperienceItem {
    jobTitle: string;
    employer: string;
    city: string;
    country: string;
    description: string;
    onClick: () => void;
    onDelete: () => void;
}

export const Item = ({
    jobTitle,
    employer,
    city,
    country,
    description,
    onClick,
    onDelete,
}: ExperienceItem) => {
    return (
        <div className="resumeSectionItem" onClick={onClick}>
            <h3>
                {jobTitle}, <i>{employer}</i>
            </h3>
            <div>
                {(city || country) && (
                    <div>
                        {city}, {country}
                    </div>
                )}
                {description && <p>{description}</p>}
            </div>
            <button type="button" onClick={onDelete}>
                Supprimer
            </button>
        </div>
    );
};
