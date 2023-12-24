import React, { useState, ComponentType, useEffect, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { upperFirst } from 'lodash';
import Collapsible from 'react-collapsible';
import { useDispatch, useSelector } from 'react-redux';
import { PersonalDetails } from './components/layout/PersonalDetails';
import AddContent from './components/layout/AddContent';
import { ResumeSectionHeading } from './components/layout/ResumeSection/ResumeSectionHeading';
import {
    ResumeSectionContent,
    ResumeSectionItemProps,
} from './components/layout/ResumeSection/ResumeSectionContent';
import {
    addSection,
    deleteSection,
    selectSections,
} from './store/resume/resume.slice';
import { saveState } from '@/browser-storage';
import store from '@store/store';

interface SectionComponents {
    name: string;
    itemCmp: ComponentType<ResumeSectionItemProps>;
}

const App = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const sections = useSelector(selectSections);
    const [sectionCmps, setSectionCmps] = useState<SectionComponents[]>([]);
    const [currentOpen, setCurrentOpen] = useState<string>('');

    const loadContent = useCallback(() => {
        const loadedSectionCmps = sections.map(async (section) => {
            const { configSection, Item } = await import(
                `@components/layout/${upperFirst(section.name)}Section`
            );
            return {
                name: configSection.key,
                itemCmp: Item,
            };
        });

        Promise.all(loadedSectionCmps).then(setSectionCmps);
    }, [sections]);

    useEffect(() => {
        loadContent();
    }, [loadContent]);

    const handleDeleteSection = (key: string) => {
        dispatch(deleteSection(key));
        setSectionCmps(sectionCmps.filter((sc) => sc.name !== key));
        saveState(store.getState());
    };

    const addContent = async (key: string) => {
        if (!sections.some((s) => s.name === key)) {
            const { configSection, Item } = await import(
                `@components/layout/${upperFirst(key)}Section`
            );

            dispatch(
                addSection({
                    name: configSection.key,
                    configSection,
                    items: [],
                }),
            );

            setSectionCmps([
                ...sectionCmps,
                {
                    name: configSection.key,
                    itemCmp: Item,
                },
            ]);

            saveState(store.getState());
        }
    };

    const handleTriggerClick = (key?: string | number) => {
        if (!key || key === currentOpen) {
            setCurrentOpen('');
        } else {
            setCurrentOpen(key as string);
        }
    };

    return (
        <Router>
            <h1>{t('apptitle')}</h1>

            <PersonalDetails />

            {sections.map((s, i) => (
                <Collapsible
                    containerElementProps={{
                        className: 'resumeSection',
                    }}
                    key={s.configSection.key}
                    accordionPosition={s.configSection.key}
                    open={currentOpen === s.configSection.key}
                    handleTriggerClick={handleTriggerClick}
                    transitionTime={300}
                    trigger={
                        <ResumeSectionHeading
                            title={s.configSection.title}
                            sectionKey={s.configSection.key}
                            onDeleteSection={handleDeleteSection}
                        />
                    }
                >
                    <>
                        {sectionCmps[i]?.itemCmp && (
                            <ResumeSectionContent
                                config={s.configSection}
                                ItemComponent={sectionCmps[i].itemCmp}
                            />
                        )}
                    </>
                </Collapsible>
            ))}

            <AddContent onAddContent={addContent} />
        </Router>
    );
};

export default App;
