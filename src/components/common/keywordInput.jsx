import React, { useState } from 'react';

const KeywordInput = () => {
    const [keywords, setKeywords] = useState([]);
    const [keywordInput, setKeywordInput] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (keywordInput.trim() !== '') {
                setKeywords([...keywords, keywordInput]);
                setKeywordInput('');
            }
        }
    };

    const handleRemoveKeyword = (index) => {
        const updatedKeywords = [...keywords];
        updatedKeywords.splice(index, 1);
        setKeywords(updatedKeywords);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center' }}>
                {keywords.map((keyword, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', background: '#f0f0f0', padding: '5px', borderRadius: '5px' }}>
                        <span style={{ marginRight: '5px' }}>{keyword}</span>
                        <button style={{ cursor: 'pointer' }} onClick={() => handleRemoveKeyword(index)}>
                            &#10060;
                        </button>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter a keyword and press Enter"
                style={{ marginTop: '10px' }}
            />
        </div>
    );
};

export default KeywordInput;
