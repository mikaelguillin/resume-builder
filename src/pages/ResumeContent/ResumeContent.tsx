import { ResumeContentConfig } from '@/components/layout/ResumeContentConfig/ResumeContentConfig';
import { ResumeConfig } from '@components/layout/ResumeConfig/ResumeConfig';

export const ResumeContent = () => {
    return <ResumeConfig configComponent={<ResumeContentConfig />} />;
};
