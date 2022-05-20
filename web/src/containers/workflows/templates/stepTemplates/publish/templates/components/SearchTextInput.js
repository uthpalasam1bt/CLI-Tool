import React, { useState } from 'react';
import { Input, Button } from 'antd';
import PropTypes from 'prop-types';

const SearchTextInput = ({ placeholder, onReset, onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        onSearch(searchText);
    };

    const handleReset = () => {
        setSearchText('');
        onReset();
    };

    return (
        <div className=" publishToScheme-dropdown-input report-dropdown-input">
            <Input
                placeholder={placeholder}
                value={searchText}
                className="input publishToScheme-input report-input"
                onChange={e => setSearchText(e.target.value)}
            />
            <div>
                <Button onClick={handleReset} className="btn-grey-o regular btn-reset">
                    Reset
                </Button>
                <Button className="btn-search tpip-btn-blue" onClick={handleSearch}>
                    Search
                </Button>
            </div>
        </div>
    );
};

SearchTextInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
};

export default SearchTextInput;
