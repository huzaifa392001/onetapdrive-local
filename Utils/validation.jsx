import { useState, useEffect } from "react";
import Image from "next/image";

export const requiredValidation = (
    <>
        <span>
            <i class="fal fa-exclamation-circle" />
        </span>
        <span>This is a required field. </span>
    </>
);

export const emailValidation = (
    <>
        <span>
            <i class="fal fa-exclamation-circle" />
        </span>
        <span>Please enter valid email</span>
    </>
);

export const passwordMatchValidation = (
    <>
        <span>
            <i class="fal fa-exclamation-circle" />
        </span>
        <span>Passwords do not match. Please try again.</span>
    </>
);

export const primaryEmailValidation = (
    <>
        <span>
            <i class="fal fa-exclamation-circle" />
        </span>
        <span>Both Emails must be different</span>
    </>
);
/**
 * Custom Hook for debouncing any value
 * @param value - The value to be debounced
 * @param delay - The debounce delay in milliseconds
 * @returns Debounced value
 */
export const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

