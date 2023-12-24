import { useRef, useState } from 'react';

export function useToggle(
    defaultValue: boolean,
): [value: boolean, toggleValue: (value?: boolean) => void] {
    const [value, setValue] = useState(defaultValue);

    function toggleValue(value?: boolean) {
        setValue((currentValue) =>
            typeof value === 'boolean' ? value : !currentValue,
        );
    }

    return [value, toggleValue];
}

export function usePrevious(value: any) {
    const currentRef = useRef(value);
    const previousRef = useRef();

    if (currentRef.current !== value) {
        previousRef.current = currentRef.current;
        currentRef.current = value;
    }

    return previousRef.current;
}
