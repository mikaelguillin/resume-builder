import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PersonalInfo from './components/layout/PersonalInfo';
import AddContent from './components/layout/AddContent';
import { ResumeSectionHeading } from './components/layout/ResumeSection/ResumeSectionHeading';
import { ResumeSectionContent } from './components/layout/ResumeSection/ResumeSectionContent';
import { useTranslation } from 'react-i18next';
import { FormElement } from './components/form/FormTypes';
import { upperFirst } from 'lodash';
import Collapsible from 'react-collapsible';

const App = () => {
    const { t } = useTranslation();
    const [sections, setSections] = useState<
        {
            formElements: FormElement[];
            itemCmp: React.ComponentType;
            configSection: any;
        }[]
    >([]);
    const [currentOpen, setCurrentOpen] = useState<string>('');

    const handleDeleteSection = (key: string) => {
        setSections(sections.filter((s) => s.configSection.key !== key));
    };

    const handleContent = async (key: string) => {
        if (!sections.some((s) => s.configSection.key === key)) {
            const { formElements, Item, configSection } = await import(
                './components/layout/' + upperFirst(key) + 'Form'
            );
            setSections([
                ...sections,
                {
                    itemCmp: Item,
                    configSection,
                    formElements,
                },
            ]);
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

            <PersonalInfo />

            {sections.map((s) => (
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
                    <ResumeSectionContent
                        config={s.configSection}
                        ItemComponent={s.itemCmp}
                        formElements={s.formElements}
                        onDeleteSection={handleDeleteSection}
                    />
                </Collapsible>
            ))}

            <AddContent onHandleContent={handleContent} />
        </Router>
    );
};

export default App;
