import React from 'react';
import {
    selectPersonalDetails,
    selectSections,
} from '@store/resume/resume.slice';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { useSelector } from 'react-redux';
import { Icon } from '@chakra-ui/icon';
import * as MdIcon from 'react-icons/md';

export const ResumePreview = () => {
    const personalDetails = useSelector(selectPersonalDetails);
    const sections = useSelector(selectSections);

    const root = {
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        padding: '1.25em',
    };

    const sectionHeading = {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        fontSize: '1.5em',
        fontFamily: 'inherit',
        lineHeight: 1.2,
    };

    const sectionHeadingIcon = {
        marginRight: '8px',
    };

    const sectionItemHeading = {
        margin: 0,
        fontWeight: 'bold',
        fontFamily: 'inherit',
        lineHeight: 1.5,
    };

    return (
        <Box
            id="resume-preview"
            background="white"
            width={'210mm'}
            height={'297mm'}
            style={root}
        >
            <Box>
                <p style={{ margin: 0 }}>{personalDetails.fullname}</p>
            </Box>
            {sections.map((section, i) => (
                <Box key={i} style={{ margin: '0.75em 0' }}>
                    <Heading style={sectionHeading}>
                        <Icon
                            as={
                                MdIcon[
                                    section.configSection.icon as keyof IconType
                                ]
                            }
                            style={sectionHeadingIcon}
                        />{' '}
                        {section.name}
                    </Heading>

                    {section.items.map((sectionItem, j) => (
                        <React.Fragment key={`${i}-${j}`}>
                            {section.name === 'education' ? (
                                <Text style={sectionItemHeading}>
                                    {sectionItem.degree}, {sectionItem.school}
                                </Text>
                            ) : section.name === 'experience' ? (
                                <>
                                    <Text style={sectionItemHeading}>
                                        {sectionItem.jobTitle},{' '}
                                        {sectionItem.employer}
                                    </Text>
                                </>
                            ) : null}
                            <Box style={{ lineHeight: 1.5 }}>
                                {sectionItem.description}
                            </Box>
                        </React.Fragment>
                    ))}
                </Box>
            ))}
        </Box>
    );
};
