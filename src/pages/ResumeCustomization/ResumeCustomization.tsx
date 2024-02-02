import { ResumeConfig } from '@components/layout/ResumeConfig/ResumeConfig';
import { ResumeCustomizationConfig } from '@components/layout/ResumeCustomizationConfig/ResumeCustomizationConfig';

export const ResumeCustomization = () => {
    return <ResumeConfig configComponent={<ResumeCustomizationConfig />} />;
};
