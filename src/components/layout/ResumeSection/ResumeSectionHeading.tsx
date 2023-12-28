import React from 'react';
import { Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const ResumeSectionHeading = ({ title }: { title: string }) => {
    const { t } = useTranslation();

    return (
        <Heading fontSize="3xl" as="h2">
            {t(title)}
        </Heading>
    );
};
