import { useEffect, useRef } from 'react'
import { AiEditor } from "aieditor";
import '../style/editor.less'
import "aieditor/dist/style.css"

function Editor(props) {
    const { placeholder = "点击输入内容...", content = '这是放置在容器中的 AiEditor 组件。', className = 'editor_style' } = props;
    const divRef = useRef(null);
    useEffect(() => {
        if (divRef.current) {
            const aiEditor = new AiEditor({
                element: divRef.current,
                placeholder,
                content,
            })
            return ()=>{
                aiEditor.destroy();
            }
        }
    }, [])

    return (
        <>
            <div className={className} ref={divRef} />
        </>
    )
}

export default Editor