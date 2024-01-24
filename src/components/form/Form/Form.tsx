import React from 'react';
import { RenderFormControl } from '../FormElement';
import { FormProps } from '../FormTypes';
import { useTranslation } from 'react-i18next';
import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react';

export const Form = ({
    elements,
    onSubmit,
    submitButton,
    onCancel,
    cancelButton,
    hookForm,
}: FormProps) => {
    const { t } = useTranslation();

    return (
        <form onSubmit={hookForm.handleSubmit(onSubmit)} noValidate>
            <div>
                {elements.map((res, key) => {
                    if ('group' in res && res.group) {
                        return (
                            <Flex
                                marginTop={2}
                                justifyContent="center"
                                key={`form-element-${res.key}-${key}`}
                            >
                                {res.group.map((resItem, keyItem, group) => (
                                    <React.Fragment
                                        key={`form-element-${resItem.key}-${keyItem}`}
                                    >
                                        <Box flex={'auto'}>
                                            <RenderFormControl
                                                element={resItem}
                                                hookForm={hookForm}
                                            />
                                        </Box>
                                        {keyItem < group.length - 1 && (
                                            <Spacer maxWidth={5} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </Flex>
                        );
                    }
                    return (
                        <Box
                            key={`form-element-${res.key}-${key}`}
                            className="formControl"
                            marginTop={2}
                        >
                            <RenderFormControl
                                element={res}
                                hookForm={hookForm}
                            />
                        </Box>
                    );
                })}
            </div>
            <ButtonGroup variant="outline" spacing="6" marginTop={3}>
                {onCancel && (
                    <Button
                        colorScheme="red"
                        onClick={onCancel}
                        variant="ghost"
                    >
                        {cancelButton?.text || t('cancel')}
                    </Button>
                )}

                <Button type="submit" colorScheme="blue">
                    {submitButton?.text || t('save')}
                </Button>
            </ButtonGroup>
        </form>
    );
};
