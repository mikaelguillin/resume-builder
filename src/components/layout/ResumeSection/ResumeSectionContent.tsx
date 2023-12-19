import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '../../form';
import { uniqueId } from 'lodash';
import { FormElement } from '../../form/FormTypes';
import { useTranslation } from 'react-i18next';

import './resumeSection.scss';

interface ResumeSectionItem {
    id: string;
    onClick: () => void;
}

export const ResumeSectionContent = <T extends ResumeSectionItem>({
    config,
    ItemComponent,
    formElements,
    onDeleteSection,
}: {
    config: any;
    ItemComponent: React.ComponentType;
    formElements: FormElement[];
    onDeleteSection: (cmp: string) => void;
}) => {
    const { t } = useTranslation();
    const hookForm = useForm();
    const [items, setItems] = useState<T[]>([]);
    const [editMode, setEditMode] = useState(false);

    const addItem = () => {
        setEditMode(true);
        hookForm.reset();
    };

    const insertItem = (item: T) => {
        setEditMode(false);
        // Edit
        if (item.id) {
            setItems(
                items.map((e) => {
                    if (e.id === item.id) {
                        return item;
                    }
                    return e;
                }),
            );
        } else {
            setItems([
                ...items,
                {
                    ...item,
                    id: uniqueId(),
                },
            ]);
        }
    };

    const handleItemClick = (item: T) => {
        setEditMode(true);
        for (const { key } of formElements) {
            hookForm.setValue(key, (item as any)[key]); // Virer any
        }
    };

    const handleDeleteItemClick = (item: T) => {
        setItems(items.filter((i) => i.id !== item.id));
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
                    elements={formElements}
                    onSubmit={insertItem}
                    submitButton={{
                        text: 'Save',
                    }}
                    onCancel={handleCancelClick}
                    cancelButton={{
                        text: 'Cancel',
                    }}
                />
            ) : (
                <div>
                    {items.map((item, i) => (
                        <ItemComponent
                            {...item}
                            key={i}
                            onClick={() => handleItemClick(item)}
                            onDelete={(e: React.MouseEvent<HTMLElement>) => {
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
