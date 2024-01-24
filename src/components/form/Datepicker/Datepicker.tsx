import { FormDatePickerElement } from '../FormTypes';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import {
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Icon,
    IconButton,
    Select as SelectCkrUI,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { addMonths, format } from 'date-fns';
import { MdClose } from 'react-icons/md';

const getYearsOptions = () => {
    const years = [];
    for (let i = new Date().getFullYear(); i >= 1945; i--) {
        years.push({ label: `${i}`, value: `${i}` });
    }
    return years;
};

const getMonthsOptions = () => {
    const currentDate = new Date();
    const months = [];
    for (let i = 0; i < 12; i++) {
        const date = addMonths(currentDate, i);
        const label = format(date, 'MMMM');
        const value = i + 1;

        months.push({ label, value });
    }
    return months;
};

export const Datepicker = ({
    element,
    hookForm,
}: {
    element: FormDatePickerElement;
    hookForm: UseFormReturn<FieldValues, any>;
}) => {
    const { setValue, control } = hookForm;
    const selectMonthsKey = `${element.key}-months`;
    const selectYearsKey = `${element.key}-years`;
    const requiredMonth = element.monthsRegisterOptions?.required
        ? true
        : false;
    const requiredYear = element.yearsRegisterOptions?.required ? true : false;
    const required = requiredMonth && requiredYear;
    const errors = hookForm.formState.errors;
    const error = errors[element.key];
    const isInvalid = error ? true : false;
    const { t } = useTranslation();

    const monthsOptions = getMonthsOptions();
    const yearsOptions = getYearsOptions();

    const deleteMonth = (value: any) => {
        setValue(element.key, { ...value, month: '' });
    };

    const deleteYear = (value: any) => {
        setValue(element.key, { ...value, year: '' });
    };

    return (
        <FormControl isRequired={required} isInvalid={isInvalid}>
            {element.label && <FormLabel>{t(element.label)}</FormLabel>}

            <Controller
                name={element.key}
                control={control}
                rules={{
                    validate: {
                        yearIsMissing: (value) => {
                            if (value && value.month && !value.year) {
                                return t('date.yearmissing');
                            }
                            return true;
                        },
                    },
                }}
                render={({ field: { onChange, value } }) => (
                    <Flex gap={2}>
                        <Flex>
                            <SelectCkrUI
                                {...element.monthsSelectProps}
                                value={value?.month}
                                onChange={(e) => {
                                    onChange({
                                        ...value,
                                        month: e.target.value,
                                    });
                                }}
                                required={requiredMonth}
                                borderTopRightRadius={0}
                                borderBottomRightRadius={0}
                            >
                                <option value=""></option>
                                {monthsOptions.map((res, key) => (
                                    <option
                                        value={res.value}
                                        key={`select-${selectMonthsKey}-option-${key}`}
                                    >
                                        {res.label}
                                    </option>
                                ))}
                            </SelectCkrUI>
                            <IconButton
                                borderTopLeftRadius={0}
                                borderBottomLeftRadius={0}
                                height="100%"
                                size="xs"
                                onClick={() => deleteMonth(value)}
                                aria-label={t('datepicker.resetyear')}
                                icon={<Icon as={MdClose} />}
                            />
                        </Flex>

                        <Flex flex="auto">
                            <SelectCkrUI
                                {...element.yearsSelectProps}
                                value={value?.year}
                                onChange={(e) => {
                                    onChange({
                                        ...value,
                                        year: e.target.value,
                                    });
                                }}
                                required={requiredYear}
                                borderTopRightRadius={0}
                                borderBottomRightRadius={0}
                            >
                                <option value=""></option>
                                {yearsOptions.map((res, key) => (
                                    <option
                                        value={res.value}
                                        key={`select-${selectYearsKey}-option-${key}`}
                                    >
                                        {res.label}
                                    </option>
                                ))}
                            </SelectCkrUI>
                            <IconButton
                                borderTopLeftRadius={0}
                                borderBottomLeftRadius={0}
                                height="100%"
                                size="xs"
                                onClick={() => deleteYear(value)}
                                aria-label={t('datepicker.resetyear')}
                                icon={<Icon as={MdClose} />}
                            />
                        </Flex>
                    </Flex>
                )}
            />
            {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    );
};
