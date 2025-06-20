import React, { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';

function SearchInput() {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSeartchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {

        if (debouncedSeartchTerm) {
            console.log('Searching for:', debouncedSeartchTerm);
        }

    }, [debouncedSeartchTerm]);

    return (
        <input 
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        />
    ); 
}

export default SearchInput;