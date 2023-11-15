/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { RxCrossCircled } from 'react-icons/rx';

const ListInput = ({ list_keywords, set_list_keyword, dots = false }) => {
    const [lists, setLists] = useState([]);
    const [keywordInput, setKeywordInput] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const KEYWORD_LENGTH = 5;
    useEffect(() => {
        // Update formDataObject when keywords change
        set_list_keyword({
            ...list_keywords,
            lists,
        });
    }, [lists, set_list_keyword]);
    const SetKeywordFunc = () => {
        if (lists.length >= KEYWORD_LENGTH) {
            setErrorMsg(`Can't take upto ${KEYWORD_LENGTH} !`);
        }
        else if (keywordInput.trim() !== '') {
            setLists([...lists, keywordInput]);
            setKeywordInput('');
            setErrorMsg('');
        }
    }

    const handleInputBlur = () => {
        SetKeywordFunc();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            SetKeywordFunc();
        }
    };

    const handleRemoveKeyword = (index, e) => {
        e.preventDefault();
        const updatedKeywords = [...lists];
        updatedKeywords.splice(index, 1);
        setLists(updatedKeywords);
        setErrorMsg('');
    };

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center' }}>
                {lists.map((keyword, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0f0f0', padding: '5px', borderRadius: '5px' }}>

                        <span style={{ marginRight: '5px', display: 'flex', alignItems: 'center', }}>
                            {dots && <span style={{ marginRight: '5px', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'black', display: 'inline-block' }}></span>}
                            {keyword}</span>
                        <button style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={(e) => handleRemoveKeyword(index, e)}>
                            <RxCrossCircled style={{ color: 'black', fontSize: '18px' }} />
                        </button>
                    </div>
                ))}
            </div>
            {errorMsg !== '' && (
                <div style={{ fontSize: '12px', color: '#ffa700', margin: '2px' }}>{errorMsg}</div>
            )}
            <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleInputBlur}
                placeholder="Enter a keyword and press Enter"
                style={{ marginTop: '10px' }}
            />
        </div>
    );
};

export default ListInput;
