import React from 'react';
import { Heading, Icon } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons/lib';
import * as MdIcon from 'react-icons/md';

export const ResumeSectionHeading = ({
    title,
    icon,
}: {
    title: string;
    icon: string;
}) => {
    const { t } = useTranslation();

    return (
        <Heading fontSize="3xl" as="h2">
            <Icon as={MdIcon[icon as keyof IconType]} marginRight={3}></Icon>
            {t(title)}
        </Heading>
    );
};
