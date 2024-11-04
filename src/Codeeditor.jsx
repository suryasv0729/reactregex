import React, { useRef, useEffect } from "react";

function CodeEditor() {
  const textAreaRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    // Initialize CodeMirror when the component mounts
    if (textAreaRef.current) {
      editorRef.current = CodeMirror.fromTextArea(textAreaRef.current, {
        lineWrapping: true,
        lineNumbers: true,
        mode: "javascript",
        theme: "default",
      });
    }

    // Cleanup function to destroy the editor on unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea(); // Convert back to textarea
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <textarea ref={textAreaRef} />
    </div>
  );
}
export default CodeEditor;
