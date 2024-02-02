import { ReactNode } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { ResumePreview } from '@components/layout/ResumePreview/ResumePreview';

export const ResumeConfig = ({
    configComponent,
}: {
    configComponent: ReactNode;
}) => {
    return (
        <Grid gridTemplateColumns="max(650px) auto" gap={5}>
            <GridItem maxHeight="calc(100vh - 70px)" overflow="auto">
                {configComponent}
            </GridItem>
            <GridItem maxHeight="calc(100vh - 70px)" overflow="auto">
                <ResumePreview />
            </GridItem>
        </Grid>
    );
};
