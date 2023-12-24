import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uniqueId } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import store, { AppState } from '@store/store';
import {
    addItemToSection,
    editSectionItem,
    selectItemsBySection,
    removeItemFromSection,
    ResumeSection,
    SectionItem,
} from '@store/resume/resume.slice';

import { Form } from '@components/form';

import './resumeSection.scss';
import { saveState } from '@/browser-storage';

export interface ResumeSectionItemProps {
    id: string;
    onClick: () => void;
    onDelete: (e: React.MouseEvent<HTMLElement>) => void;
}

export const ResumeSectionContent = ({
    config,
    ItemComponent,
}: {
    config: ResumeSection['configSection'];
    ItemComponent: React.ComponentType<ResumeSectionItemProps>;
}) => {
    const { t } = useTranslation();
    const hookForm = useForm();
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();
    const items = useSelector((state: AppState) =>
        selectItemsBySection(state, config.key),
    );

    const addItem = () => {
        setEditMode(true);
        hookForm.reset();
    };

    const insertItem = (item: SectionItem) => {
        setEditMode(false);
        if (item.id) {
            dispatch(editSectionItem({ sectionName: config.key, item }));
        } else {
            dispatch(
                addItemToSection({
                    sectionName: config.key,
                    item: {
                        ...item,
                        id: uniqueId(),
                    },
                }),
            );
        }
        saveState(store.getState());
    };

    const handleItemClick = (item: SectionItem) => {
        setEditMode(true);
        for (const { key } of config.formElements) {
            hookForm.setValue(key, (item as any)[key]); // Remove any
        }
    };

    const handleDeleteItemClick = (item: SectionItem) => {
        dispatch(removeItemFromSection({ sectionName: config.key, item }));
        saveState(store.getState());
    };

    const handleCancelClick = () => {
        hookForm.clearErrors();
        setEditMode(false);
    };

    return (
        <div>
            {editMode ? (
                <Form
                    hookForm={hookForm}
                    elements={config.formElements}
                    onSubmit={insertItem}
                    onCancel={handleCancelClick}
                />
            ) : (
                <div>
                    {items.map((item, i) => (
                        <ItemComponent
                            {...item}
                            key={i}
                            onClick={() => handleItemClick(item)}
                            onDelete={(e) => {
                                e.stopPropagation();
                                handleDeleteItemClick(item);
                            }}
                        />
                    ))}
                    <button className="button" type="button" onClick={addItem}>
                        {t(config.addItemLabel)}
                    </button>
                </div>
            )}
        </div>
    );
};
