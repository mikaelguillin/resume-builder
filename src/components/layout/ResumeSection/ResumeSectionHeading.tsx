import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import {
    Button,
    Heading,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Input,
} from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';
import * as MdIcon from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { ResumeSection, setSectionProperty } from '@/store/resume/resume.slice';
import { useTranslation } from 'react-i18next';

const icons = ['MdWork', 'MdSchool', 'MdFolder', 'MdHome', 'MdLibraryBooks'];

export const ResumeSectionHeading = ({
    sectionName,
    configSection,
    editMode,
}: {
    sectionName: string;
    configSection: ResumeSection['configSection'];
    editMode?: boolean;
}) => {
    const selectedRefIcon = useRef<HTMLButtonElement | null>(null);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const defaultSectionTitle = t(configSection.title);
    const [sectionTitle, setSectionTitle] = useState(defaultSectionTitle);

    const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    };

    const handleInputClick = (e: MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
    };

    const handleMenuItemClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(
            setSectionProperty({
                sectionName,
                sectionItem: {
                    key: 'icon',
                    value: e.currentTarget.value,
                },
            }),
        );
        selectedRefIcon.current = e.currentTarget;
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSectionTitle(e.currentTarget.value);
    };

    const handleValidationClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(
            setSectionProperty({
                sectionName,
                sectionItem: {
                    key: 'title',
                    value: sectionTitle,
                },
            }),
        );
    };

    return (
        <>
            {editMode ? (
                <>
                    <Menu matchWidth initialFocusRef={selectedRefIcon}>
                        <MenuButton
                            as={Button}
                            rightIcon={<Icon as={MdIcon.MdArrowDropDown} />}
                            onClick={handleMenuClick}
                        >
                            <Icon
                                as={
                                    MdIcon[configSection.icon as keyof IconType]
                                }
                            />
                        </MenuButton>
                        <MenuList>
                            {icons.map((icn) => (
                                <MenuItem
                                    key={icn}
                                    onClick={handleMenuItemClick}
                                    value={icn}
                                >
                                    <Icon as={MdIcon[icn as keyof IconType]} />
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Input
                        type="text"
                        onClick={handleInputClick}
                        onChange={handleInputChange}
                        value={sectionTitle}
                        width="300px"
                        marginLeft={2}
                    />
                    {sectionTitle !== defaultSectionTitle && (
                        <Button
                            onClick={handleValidationClick}
                            colorScheme="blue"
                            marginLeft={2}
                        >
                            <Icon as={MdIcon.MdCheck} />
                        </Button>
                    )}
                </>
            ) : (
                <Heading
                    fontSize="3xl"
                    as="h2"
                    display="flex"
                    alignItems="center"
                >
                    <Icon
                        as={MdIcon[configSection.icon as keyof IconType]}
                        marginRight={3}
                    ></Icon>
                    {defaultSectionTitle}
                </Heading>
            )}
        </>
    );
};
