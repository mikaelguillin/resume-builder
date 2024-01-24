import React, { useState, useEffect, useRef } from 'react';
import {
    ItemDate,
    selectPersonalDetails,
    selectSections,
} from '@store/resume/resume.slice';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { useSelector } from 'react-redux';
import { Icon } from '@chakra-ui/icon';
import * as MdIcon from 'react-icons/md';
import { IconType } from 'react-icons';

const displayDates = (startDate: ItemDate, endDate: ItemDate) => {
    let startD = '';
    let endD = '';
    let date = '';

    if (startDate?.year) {
        startD = startDate.year;

        if (startDate.month) {
            startD = `${startDate.month}/${startDate.year}`;
        }

        date = startD;
    }

    if (endDate?.year) {
        endD = endDate.year;

        if (endDate.month) {
            endD = `${endDate.month}/${endDate.year}`;
        }

        if (startDate.year) {
            date = `${startD} - ${endD}`;
        } else {
            date = endD;
        }
    }

    return date;
};

export const ResumePreview = () => {
    const personalDetails = useSelector(selectPersonalDetails);
    const sections = useSelector(selectSections);
    const scaledWrapper = useRef<HTMLDivElement>(null);
    const scaledContent = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState<number | null>(null);

    const scaleResume = () => {
        if (scaledWrapper.current && scaledContent.current) {
            const scaledWrapperElem = scaledWrapper.current;
            const scaledContentElem = scaledContent.current;

            scaledContentElem.style.transform = 'scale(1, 1)';

            const { width: cw, height: ch } =
                scaledContentElem.getBoundingClientRect();

            const { width: ww, height: wh } =
                scaledWrapperElem.getBoundingClientRect();

            const scaleAmtX = Math.min(ww / cw, wh / ch, 1);

            setScale(scaleAmtX);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', scaleResume);
        scaleResume();

        return () => {
            window.removeEventListener('resize', scaleResume);
        };
    }, []);

    const resumePage = {
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        padding: '8px',
        pageBreakAfter: 'always',
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

    const sectionItemDescription = {
        fontFamily: 'inherit',
        fontSize: '14px',
        lineHeight: 1.5,
        whiteSpace: 'pre-line',
        margin: 0,
        letterSpacing: '0.1px',
    };

    return (
        <Box ref={scaledWrapper}>
            <Box
                id="resume-preview"
                ref={scaledContent}
                transformOrigin="0 0"
                width="210mm"
                height="297mm"
                style={
                    scale
                        ? { transform: `scale(${scale}, ${scale})` }
                        : undefined
                }
            >
                <Box
                    className="resume-page"
                    background="white"
                    width="210mm"
                    height="297mm"
                    style={resumePage}
                >
                    {sections.map((section, i) => (
                        <Box key={i} style={{ margin: 0 }}>
                            <Heading style={sectionHeading}>
                                <Icon
                                    as={
                                        MdIcon[
                                            section.configSection
                                                .icon as keyof IconType
                                        ]
                                    }
                                    style={sectionHeadingIcon}
                                />{' '}
                                {section.name}
                            </Heading>

                            {section.items.map((sectionItem, j) => {
                                const date = displayDates(
                                    sectionItem.startDate,
                                    sectionItem.endDate,
                                );
                                return (
                                    <React.Fragment key={`${i}-${j}`}>
                                        {section.name === 'education' &&
                                        'degree' in sectionItem ? (
                                            <Text style={sectionItemHeading}>
                                                {sectionItem.degree},{' '}
                                                {sectionItem.school}
                                            </Text>
                                        ) : section.name === 'experience' &&
                                          'jobTitle' in sectionItem ? (
                                            <>
                                                <Text
                                                    style={sectionItemHeading}
                                                >
                                                    {sectionItem.jobTitle},{' '}
                                                    {sectionItem.employer}
                                                </Text>
                                            </>
                                        ) : null}
                                        {date ? <Text>{date}</Text> : null}
                                        {sectionItem.description ? (
                                            <Text
                                                style={sectionItemDescription}
                                            >
                                                {sectionItem.description}
                                            </Text>
                                        ) : null}
                                    </React.Fragment>
                                );
                            })}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
