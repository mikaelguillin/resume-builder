import { ChangeEvent } from 'react';
import i18next from 'i18next';
import { Flex, Heading, Select, Link } from '@chakra-ui/react';
import { ResumeDownload } from '../ResumeDownload/ResumeDownload';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Header = () => {
    const { t } = useTranslation();

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        i18next.changeLanguage(e.target.value);
    };

    return (
        <Flex alignItems="center" height="70px">
            <Heading fontSize="4xl" as="h1">
                {t('apptitle')}
            </Heading>
            <ResumeDownload />
            <nav role="navigation">
                <Link className="nav-link" margin="0 10px" as={NavLink} to="/">
                    {t('nav.content')}
                </Link>
                <Link
                    className="nav-link"
                    margin="0 10px"
                    as={NavLink}
                    to="/customization"
                >
                    {t('nav.customization')}
                </Link>
            </nav>
            <Select
                marginLeft="auto"
                width="150px"
                variant="filled"
                onChange={handleLanguageChange}
            >
                <option value="en">{t('nav.lng.english')}</option>
                <option value="fr">{t('nav.lng.french')}</option>
            </Select>
        </Flex>
    );
};
