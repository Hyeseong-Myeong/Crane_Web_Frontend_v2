import { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


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
    'size',
    'h1',
  ];


  interface QuillEditorProps {
    setContent: (value: string) => void; // 상위에서 전달받은 setContent 함수
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
      
        return(
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
        )
}