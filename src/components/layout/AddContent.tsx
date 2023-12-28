import React from 'react';
import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    useDisclosure,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const AddContent = ({
    onAddContent,
}: {
    onAddContent: (key: string) => void;
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useTranslation();
    const handleAddContentClick = (e: React.MouseEvent<HTMLElement>) => {
        const section = (e.currentTarget as HTMLElement).getAttribute(
            'data-section',
        );
        if (section) {
            onAddContent(section);
        }
        onClose();
    };

    return (
        <Box marginTop={6}>
            <Button colorScheme="blue" onClick={onOpen}>
                {t('addsection')}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="3xl">{t('addsection')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <SimpleGrid spacing={4}>
                            <Card
                                borderWidth={1}
                                padding={4}
                                onClick={handleAddContentClick}
                                data-section="education"
                            >
                                <CardHeader>
                                    <Heading size="md">
                                        {t('education.title')}
                                    </Heading>
                                </CardHeader>
                                <CardBody>
                                    <Text>
                                        Show off your primary education, college
                                        degrees & exchange semesters.
                                    </Text>
                                </CardBody>
                            </Card>
                            <Card
                                borderWidth={1}
                                padding={4}
                                onClick={handleAddContentClick}
                                data-section="experience"
                            >
                                <CardHeader>
                                    <Heading size="md">
                                        {t('professionalexperience.title')}
                                    </Heading>
                                </CardHeader>
                                <CardBody>
                                    <Text>
                                        A place to highlight your professional
                                        experience - including internships.
                                    </Text>
                                </CardBody>
                            </Card>
                        </SimpleGrid>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default AddContent;
