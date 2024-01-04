import { useToggle } from '@utils/hooks';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

export const ResumeDownload = () => {
    const [downloadLoading, toggleDownloadLoading] = useToggle(false);
    const { t } = useTranslation();

    const handleDownloadClick = async () => {
        toggleDownloadLoading();

        const htmlContent =
            document.querySelector('#resume-preview')?.outerHTML;

        const response = await fetch('http://localhost:5000/pdf', {
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
            link.click();

            // document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
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
