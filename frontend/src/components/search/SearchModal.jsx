import { useState } from "react";
import ReactModal from "react-modal";
import SearchBar from "./SearchBar";

ReactModal.setAppElement('#root');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        border: '1px solid #28547a',
        borderRadius: '4px'
    }
};

export default function SearchModal(props) {
    const [showSearchModal, setShowSearchModal] = useState(props.isOpen);

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
                style={customStyles}
            >
                <SearchBar />
                <br />
                <br />
                <button onClick={handleCloseSearchModal}>
                    Cancel
                </button>
            </ReactModal>
        </div>
    )
}