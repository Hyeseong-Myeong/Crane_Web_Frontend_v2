import { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import styled from "styled-components";


const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
    'color',
    'background',
    'size'
];

const Wrapper = styled.div`
    .ql-editor strong{
        font-weight:bold;
    }

    .ql-editor em{
        font-style: italic;
    }
`


interface QuillEditorProps {
    setContent: (value: string) => void;
}

export default function QuillEditor({setContent} : QuillEditorProps) {
    const [values, setValues] = useState<string>();

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ size: ['small', false, 'large', 'huge'] }],
                    [{ align: [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ["image"],
                    [
                        {
                            color: [],
                        },
                        { background: [] },
                    ],
                ],
            },
        };
    }, []);

    const handleChange = (content: string) => {
        setValues(content);
        setContent(content); // 상위 컴포넌트의 state 업데이트
    };

    // var italic = Quill.import('formats/italic')
    // Quill.register(italic, true)


    return(
        <Wrapper>
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={values}
                onChange={handleChange}
                style={{
                    width:"70vw",
                    height:"600px"
                }}
            />
        </Wrapper>
    )
}