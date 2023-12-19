import React from 'react';
import { useTranslation } from 'react-i18next';

const AddContent = ({
    onHandleContent,
}: {
    onHandleContent: (key: string) => void;
}) => {
    const { t } = useTranslation();
    const handleContentClick = (e: React.MouseEvent<HTMLElement>) => {
        const section = (e.target as HTMLElement).getAttribute('data-section');
        if (section) {
            onHandleContent(section);
        }
    };

    return (
        <div>
            <h2>{t('addsection')}</h2>
            <div>
                <div onClick={handleContentClick} data-section="education">
                    {t('education.title')}
                </div>
                <div onClick={handleContentClick} data-section="experience">
                    {t('professionalexperience.title')}
                </div>
            </div>
        </div>
    );
};

export default AddContent;
