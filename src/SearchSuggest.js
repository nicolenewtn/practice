import { useRef, useEffect, useState } from 'react'; 
import { useDebounce } from './useDebounce';
import { getSuggestions } from './suggestionApi';

const LAST_KEY = 'lastSearch';

export default function SearchSuggest() {

    const [query, setQuery] = useState(() => localStorage.getItem(LAST_KEY) || '');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [highlight, setHighlight] = useState(-1);

    const debounced = useDebounce(query, 300);
    const listRef = useRef(null);

    useEffect(() => {
        localStorage.setItem(LAST_KEY, query)
    }, [query])

    useEffect(() => {
        if (!debounced.trim()) {
            setResults([]);
            return;
        }

        let cancelled = false;

        (async () => {
            
            try {
                setLoading(true);
                setError('');
                const data = await getSuggestions(debounced);
                if (!cancelled) setResults(data);
            } catch (_) {
                if(!cancelled) setError('Failed loading suggestions...');
            } finally {
                if (!cancelled) setLoading(false);
            };
        })();

        return () => {
            cancelled = true;
        }
    }, [debounced])

   const onKeyDown = (e) => {
    if (!results.length) return; 
    if (e.key === 'ArrowDown') {
        e.preventDefault(); 
        setHighlight((h) => (h + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault(); 
        setHighlight((h) => (h - 1 + results.length) % results.length);
    } else if (e.key === 'Escape') {
        setResults([]);
    };
   }

   const choose = (value) => {
    setQuery(value);
    setResults([]);
}

    return (
        <div
        style={{position: 'relative', width: 300}}>
            <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => { 
                setQuery(e.target.value); 
                setHighlight(-1); 
            }}
            onKeyDown={onKeyDown}
            />

            {loading && (
                <span>⏳</span>
            )}

            {results.length > 0 && (
                <ul 
                id='suggestions'
                ref={listRef}
                style={{
                    listStyle: 'none', 
                    width: '100%',
                    position: 'absolute',
                    margin: 0,
                    padding: 0,
                }}
                >
                    {results.map((item, i) => (
                        <li
                        key={item}
                        onClick={()=>choose(item)}
                        onMouseEnter={()=>setHighlight(i)}
                        style={{
                            background: highlight === i ? '#f0f8ff' : 'transparent',
                            cursor: 'pointer',
                        }}
                        >{item}
                        </li>
                    ))}
                </ul>
            )}

            {!loading && debounced && !results.length && !error && (
                <div> No results found.</div>
            )}
        </div>
    );
}
