import { Box, Flex, Heading, Icon } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
    ResumeSection,
    selectSections,
    setSections,
} from '@store/resume/resume.slice';
import { useTranslation } from 'react-i18next';
import { Reorder } from 'framer-motion';
import * as MdIcon from 'react-icons/md';
import { IconType } from 'react-icons/lib';

export const ResumeCustomizationConfig = () => {
    const dispatch = useDispatch();
    const sections = useSelector(selectSections);
    const { t } = useTranslation();

    const handleReorderSections = (sections: ResumeSection[]) => {
        dispatch(setSections({ sections }));
    };

    return (
        <Box>
            <Box
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                bg="white"
                boxShadow="base"
            >
                <Heading fontSize="3xl" as="h2" marginBottom={3}>
                    Layout
                </Heading>

                <Heading fontSize="xl" as="h3" marginBottom={3}>
                    {t('resumecustomization.reordersections')}
                </Heading>

                <Reorder.Group
                    values={sections}
                    onReorder={handleReorderSections}
                    axis="y"
                    as="div"
                >
                    {sections.map((section) => (
                        <Reorder.Item
                            key={section.name}
                            as="div"
                            value={section}
                        >
                            <Flex
                                alignItems="center"
                                background="white"
                                border="1px solid black"
                                marginTop={2}
                                marginBottom={2}
                                padding={2}
                                cursor="move"
                            >
                                <Icon
                                    as={
                                        MdIcon[
                                            section.configSection
                                                .icon as keyof IconType
                                        ]
                                    }
                                    marginRight={2}
                                ></Icon>
                                {section.name}
                            </Flex>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </Box>
        </Box>
    );
};
