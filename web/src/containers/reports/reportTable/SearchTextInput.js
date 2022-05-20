import React, { useState } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const SearchTextInput = ({ placeholder, onReset, onSearch, concurrencyModalVisibility = true, isClient,onChange }) => {
    const [searchText, setSearchText] = useState('');

    const hadleChange=(e)=>{
        setSearchText(e.target.value)
        onChange(e.target.value)
    }
    const handleSearch = () => {
        onSearch(searchText);
    };

    const handleReset = () => {
        setSearchText('');
        onReset();
    };

    return (
        concurrencyModalVisibility && (
            <div className="report-dropdown-input">
                <Input
                    placeholder={placeholder}
                    style={{ fontSize: 13 }}
                    value={searchText}
                    className="input report-input"
                    onChange={e => hadleChange(e)}
                />
                <div>
                    <button
                        onClick={handleReset}
                        className={isClient ? 'btn-reset btn-grey-o' : 'btn-reset btn-grey-o regular'}
                    >
                        Reset
                    </button>
                    <button className="btn-search tpip-btn-blue" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
        )
    );
};

SearchTextInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
};

export default SearchTextInput;
