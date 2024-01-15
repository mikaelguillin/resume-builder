import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import { ResumePreview } from '@components/layout/ResumePreview/ResumePreview';
import { ResumeDownload } from '@components/layout/ResumeDownload/ResumeDownload';
import { ResumeConfiguration } from '@components/layout/ResumeConfiguration/ResumeConfiguration';

const App = () => {
    const { t } = useTranslation();

    return (
        <Router>
            <Box padding="0 10px">
                <Flex alignItems="center" height="70px">
                    <Heading fontSize="4xl" as="h1">
                        {t('apptitle')}
                    </Heading>
                    <ResumeDownload />
                </Flex>

                <Grid gridTemplateColumns="max(650px) auto" gap={5}>
                    <GridItem maxHeight="calc(100vh - 70px)" overflow="auto">
                        <ResumeConfiguration />
                    </GridItem>
                    <GridItem maxHeight="calc(100vh - 70px)" overflow="auto">
                        <ResumePreview />
                    </GridItem>
                </Grid>
            </Box>
        </Router>
    );
};

export default App;
