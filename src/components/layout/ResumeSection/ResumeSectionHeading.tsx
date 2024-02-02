import { Heading, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';
import * as MdIcon from 'react-icons/md';

export const ResumeSectionHeading = ({
    title,
    icon,
}: {
    title: string;
    icon: string;
}) => {
    return (
        <Heading fontSize="3xl" as="h2" display="flex" alignItems="center">
            <Icon as={MdIcon[icon as keyof IconType]} marginRight={3}></Icon>
            {title}
        </Heading>
    );
};
