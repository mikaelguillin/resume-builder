import { useToggle } from '@utils/hooks';
import { Button, useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { API_URL } from '@utils/constants';

export const ResumeDownload = () => {
    const [downloadLoading, toggleDownloadLoading] = useToggle(false);
    const { t } = useTranslation();
    const toast = useToast();

    const handleDownloadClick = async () => {
        toggleDownloadLoading();

        const htmlContent =
            document.querySelector('#resume-preview')?.outerHTML;

        try {
            const response = await fetch(`${API_URL}/resume/pdf`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ htmlContent }),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `resume-${format(new Date(), 'yyyyMMdd')}.pdf`;
                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } else {
                toast({
                    title: `HTTP error! Status: ${response.status}`,
                    status: 'error',
                });
            }
        } catch (e: any) {
            toast({
                title: e.message,
                status: 'error',
            });
        }

        toggleDownloadLoading();
    };

    return (
        <Button
            isLoading={downloadLoading}
            loadingText={t('downloading')}
            onClick={handleDownloadClick}
            colorScheme="blue"
            marginLeft={5}
        >
            {t('download')}
        </Button>
    );
};
