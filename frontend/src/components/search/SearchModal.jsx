import { useState } from "react";
import ReactModal from "react-modal";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";

// Set the Modal
ReactModal.setAppElement('#root');

export default function SearchModal(props) {
    const [showSearchModal, setShowSearchModal] = useState(props.isOpen);
    const [searchResults, setSearchResults] = useState([]);

    const handleCloseSearchModal = () => {
        setShowSearchModal(false);

        props.handleClose();
    };

    return (
        <div>
            <ReactModal
                name='searchModal'
                isOpen={showSearchModal}
                contentLabel='Search'
            >
                <SearchBar setResults={setSearchResults} />
                <SearchResultsList searchResults={searchResults} />
                <br />
                <br />
                <button onClick={handleCloseSearchModal}>
                    Cancel
                </button>
            </ReactModal>
        </div>
    )
}