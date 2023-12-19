import React from 'react';
import { useTranslation } from 'react-i18next';

export const ResumeSectionHeading = ({
    title,
    sectionKey,
    onDeleteSection,
}: {
    title: string;
    sectionKey: string;
    onDeleteSection: (key: string) => void;
}) => {
    const { t } = useTranslation();

    const handleDeleteSectionClick = (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        e.stopPropagation();
        onDeleteSection(sectionKey);
    };

    return (
        <div className="titleWrapper">
            <h2 className="title">{t(title)}</h2>
            <button
                className="button"
                type="button"
                onClick={handleDeleteSectionClick}
            >
                Delete section
            </button>
        </div>
    );
};
