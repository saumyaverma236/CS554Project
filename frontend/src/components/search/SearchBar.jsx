import { useState } from "react";
import axios from 'axios'

export default function SearchBar(props) {
    // Create state to hold user input
    const [input, setInput] = useState("");
    
    // Call server passing in current search term
    const fetchData = async (value) => {
        try {
            const { data: result} = await axios.post('/api/search', {
                searchTerm: value
            });

            // Set the searchResults state of parent component (SearchModal)
            props.setResults(result);
        } catch (error) {
            console.log(error);
        }
    }

    // When input is changed (every keystroke in input field)
    // Set the input state to current value
    // Call the server endpoint to search for current value/search term
    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    // Show a input field where user can enter search term for song
    // Updates input state and calls server enpoint
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