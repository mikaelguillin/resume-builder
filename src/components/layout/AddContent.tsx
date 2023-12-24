import React from 'react';
import { useTranslation } from 'react-i18next';

const AddContent = ({
    onAddContent,
}: {
    onAddContent: (key: string) => void;
}) => {
    const { t } = useTranslation();
    const handleAddContentClick = (e: React.MouseEvent<HTMLElement>) => {
        const section = (e.target as HTMLElement).getAttribute('data-section');
        if (section) {
            onAddContent(section);
        }
    };

    return (
        <div>
            <h2>{t('addsection')}</h2>
            <div>
                <div onClick={handleAddContentClick} data-section="education">
                    {t('education.title')}
                </div>
                <div onClick={handleAddContentClick} data-section="experience">
                    {t('professionalexperience.title')}
                </div>
            </div>
        </div>
    );
};

export default AddContent;
