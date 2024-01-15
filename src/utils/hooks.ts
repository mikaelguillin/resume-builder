import { throttle } from 'lodash';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';

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

export function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        const updateSize = throttle(() => {
            setSize([window.innerWidth, window.innerHeight]);
        }, 300);
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export function useElemSizeOnWindowResize(elem?: HTMLElement | null) {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        const updateSize = throttle(() => {
            console.log({ elem });

            if (elem) {
                setSize([elem.clientWidth, elem.clientHeight]);
            }
        }, 300);
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export const useRefDimensions = (ref: any) => {
    const [dimensions, setDimensions] = useState({ width: 1, height: 2 });
    useEffect(() => {
        if (ref.current) {
            const { current } = ref;
            const boundingRect = current.getBoundingClientRect();
            const { width, height } = boundingRect;
            setDimensions({
                width: Math.round(width),
                height: Math.round(height),
            });
        }
    }, [ref]);
    return dimensions;
};
