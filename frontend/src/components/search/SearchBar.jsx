import { useState } from "react";
import axios from 'axios'

export default function SearchBar() {
    const [input, setInput] = useState("");
    
    
    const fetchData = async (value) => {
        try {
            const result = await axios.post('/api/search', {
                searchTerm: value
            });

            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search for Songs..." 
                value={input}
                onChange={(e) => { handleChange(e.target.value); }}
            />
        </div>
    )
}