import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Icon,
    IconButton,
} from '@chakra-ui/react';
import { PersonalDetails } from '../PersonalDetails';
import { ResumeSectionHeading } from '../ResumeSection/ResumeSectionHeading';
import {
    ResumeSectionContent,
    ResumeSectionItemProps,
} from '../ResumeSection/ResumeSectionContent';
import AddContent from '../AddContent';
import { useDispatch, useSelector } from 'react-redux';
import { useState, ComponentType, useCallback, useEffect } from 'react';
import {
    selectSections,
    addSection,
    deleteSection,
} from '@store/resume/resume.slice';
import { saveState } from '@/browser-storage';
import store from '@store/store';
import { MdDelete } from 'react-icons/md';
import { upperFirst } from 'lodash';
import { useTranslation } from 'react-i18next';

interface SectionComponents {
    name: string;
    itemCmp: ComponentType<ResumeSectionItemProps>;
}

export const ResumeContentConfig = () => {
    const dispatch = useDispatch();
    const sections = useSelector(selectSections);
    const [sectionCmps, setSectionCmps] = useState<SectionComponents[]>([]);
    const { t } = useTranslation();

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
        <Box>
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
                        {({ isExpanded }) => (
                            <>
                                <AccordionButton as="div">
                                    <ResumeSectionHeading
                                        sectionName={s.name}
                                        configSection={s.configSection}
                                        editMode={isExpanded}
                                    />
                                    <Box marginLeft="auto">
                                        <IconButton
                                            aria-label="Delete section"
                                            variant="ghost"
                                            icon={
                                                <Icon
                                                    as={MdDelete}
                                                    boxSize={6}
                                                />
                                            }
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
                                            ItemComponent={
                                                sectionCmps[i].itemCmp
                                            }
                                        />
                                    )}
                                </AccordionPanel>
                            </>
                        )}
                    </AccordionItem>
                ))}
            </Accordion>
            <AddContent onAddContent={addContent} />
        </Box>
    );
};
