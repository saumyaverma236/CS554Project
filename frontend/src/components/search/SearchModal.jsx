import React, { useState } from 'react';
import ReactModal from "react-modal";
import axios from 'axios';
import { Modal, Box, Button, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import SearchResultsList from './SearchResultsList';

// Set the Modal
ReactModal.setAppElement('#root');

export default function SearchModal(props) {
    const [searchResults, setSearchResults] = useState([]);

    // Close handler updates the parent state if provided
    const handleCloseSearchModal = () => {
        if (props.handleClose) {
            props.handleClose();
        }
    };

    return (
        <Modal
            open={props.isOpen}
            onClose={handleCloseSearchModal}
            aria-labelledby="search-modal-title"
            aria-describedby="search-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 4,
                    minWidth: 300,
                    maxWidth: 600,
                    width: '80%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    margin: '20px auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                className="card"
            >
                <Typography id="search-modal-title" variant="h6" className="heading">
                    Search for Songs
                </Typography>
                <SearchBar setResults={setSearchResults} />
                <SearchResultsList searchResults={searchResults} />
                <Button
                    onClick={handleCloseSearchModal}
                    className="button"
                    sx={{ marginTop: 2, backgroundColor: '#40e0d0', '&:hover': { backgroundColor: '#ff7f50' } }}
                >
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
}
