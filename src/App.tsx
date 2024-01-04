import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { ResumePreview } from '@components/layout/ResumePreview/ResumePreview';
import { ResumeDownload } from '@components/layout/ResumeDownload/ResumeDownload';
import { ResumeConfiguration } from '@components/layout/ResumeConfiguration/ResumeConfiguration';

const App = () => {
    const { t } = useTranslation();

    return (
        <Router>
            <Box padding={5}>
                <Flex alignItems="center" marginBottom={5}>
                    <Heading fontSize="4xl" as="h1">
                        {t('apptitle')}
                    </Heading>
                    <ResumeDownload />
                </Flex>

                <SimpleGrid columns={2} spacing={10}>
                    <ResumeConfiguration />
                    <ResumePreview />
                </SimpleGrid>
            </Box>
        </Router>
    );
};

export default App;
