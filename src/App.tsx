import React, { useState, ComponentType, useEffect, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { upperFirst } from 'lodash';
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
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Heading,
    Icon,
    IconButton,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

interface SectionComponents {
    name: string;
    itemCmp: ComponentType<ResumeSectionItemProps>;
}

const App = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const sections = useSelector(selectSections);
    const [sectionCmps, setSectionCmps] = useState<SectionComponents[]>([]);

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

    const handleDeleteSectionClick = (
        e: React.MouseEvent<HTMLButtonElement>,
        key: string,
    ) => {
        e.stopPropagation();
        dispatch(deleteSection(key));
        setSectionCmps(sectionCmps.filter((sc) => sc.name !== key));
        saveState(store.getState());
    };

    return (
        <Router>
            <Heading fontSize="4xl" as="h1" marginTop={5} marginBottom={5}>
                {t('apptitle')}
            </Heading>

            <PersonalDetails />

            <Accordion allowToggle>
                {sections.map((s, i) => (
                    <AccordionItem
                        key={s.configSection.key}
                        marginTop={5}
                        bg="white"
                        borderWidth="1px"
                        borderRadius="lg"
                        boxShadow="md"
                    >
                        <AccordionButton as="div">
                            <ResumeSectionHeading
                                title={s.configSection.title}
                                icon={s.configSection.icon}
                            />
                            <Box marginLeft="auto">
                                <IconButton
                                    aria-label="Delete section"
                                    variant="ghost"
                                    icon={<Icon as={MdDelete} boxSize={6} />}
                                    onClick={(e) =>
                                        handleDeleteSectionClick(
                                            e,
                                            s.configSection.key,
                                        )
                                    }
                                />
                                <AccordionIcon />
                            </Box>
                        </AccordionButton>
                        <AccordionPanel>
                            {sectionCmps[i]?.itemCmp && (
                                <ResumeSectionContent
                                    config={s.configSection}
                                    ItemComponent={sectionCmps[i].itemCmp}
                                />
                            )}
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>

            <AddContent onAddContent={addContent} />
        </Router>
    );
};

export default App;
