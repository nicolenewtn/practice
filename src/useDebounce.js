import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 300) {
    const [debounce, setDebounce] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebounce(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);

    return debounce;
}


