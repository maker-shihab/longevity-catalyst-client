import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import the styles
import '../../assets/styles/textEditor.css';

const TextEditor = ({setBioText}) => {
    

    const [text, setText] = useState('');

    const handleChange = (value) => {
        setText(value);
        setBioText(value);
    };

    // Define custom toolbar options
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  // custom header options
            ['bold', 'italic'], // basic formatting
            ['link'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // lists
        ],
     

    };



    return (
        <div className='text-editor-style-1'>
          
            <ReactQuill
                theme="snow" // or use "bubble" for a different theme
                value={text}
                onChange={handleChange}
                modules={modules}
                placeholder="I'm a Product Designer based in Dhaka, Bangladesh. I specialize in UX/UI design, brand strategy, and Webflow development.
                "
            />
        </div>
    );
};

export default TextEditor;