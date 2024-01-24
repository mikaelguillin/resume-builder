import React, { MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Reorder } from 'framer-motion';
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
    setSectionItems,
} from '@store/resume/resume.slice';
import { Form } from '@components/form';
import { saveState } from '@/browser-storage';
import { Button } from '@chakra-ui/react';
import { uniqueId } from '@utils/utils';
import { ResumeSectionItem } from '../ResumeSectionItem/ResumeSectionItem';

export interface ResumeSectionItemProps {
    id: string;
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
    const dispatch = useDispatch();
    const items = useSelector((state: AppState) =>
        selectItemsBySection(state, config.key),
    );
    const [editMode, setEditMode] = useState(items.length ? false : true);

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

    const handleItemClick = (e: MouseEvent<HTMLElement>, item: SectionItem) => {
        if (!(e.target as HTMLElement).classList.contains('drag-handler')) {
            setEditMode(true);
            for (const formElem of config.formElements) {
                if ('group' in formElem && formElem.group) {
                    for (const groupElem of formElem.group) {
                        hookForm.setValue(
                            groupElem.key,
                            (item as any)[groupElem.key],
                        );
                    }
                } else {
                    hookForm.setValue(
                        formElem.key,
                        (item as any)[formElem.key],
                    );
                }
            }
        }
    };

    const handleDeleteItemClick = (
        e: MouseEvent<HTMLElement>,
        item: SectionItem,
    ) => {
        e.stopPropagation();
        dispatch(removeItemFromSection({ sectionName: config.key, item }));
        saveState(store.getState());
    };

    const handleCancelClick = () => {
        hookForm.clearErrors();
        setEditMode(false);
    };

    const handleReorderItems = (items: SectionItem[]) => {
        dispatch(setSectionItems({ sectionName: config.key, items }));
        saveState(store.getState());
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
                    <Reorder.Group
                        values={items}
                        onReorder={handleReorderItems}
                        axis="y"
                        as="div"
                    >
                        {items.map((item) => (
                            <ResumeSectionItem
                                key={item.id}
                                item={item}
                                onClick={(e) => handleItemClick(e, item)}
                                onDelete={(e) => handleDeleteItemClick(e, item)}
                            >
                                <ItemComponent {...item} />
                            </ResumeSectionItem>
                        ))}
                    </Reorder.Group>

                    <Button colorScheme="blue" onClick={addItem} marginTop={5}>
                        {t(config.addItemLabel)}
                    </Button>
                </div>
            )}
        </div>
    );
};
