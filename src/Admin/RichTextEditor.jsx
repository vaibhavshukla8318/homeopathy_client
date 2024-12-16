import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ content, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"], // Formatting
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "blockquote", "code-block"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }], // Text and Background color
      ["clean"], // Remove formatting
    ],
  };

  return (
    <ReactQuill
      theme="snow"
      value={content}
      onChange={onChange}
      modules={modules}
      placeholder="Enter your content here..."
    />
  );
};

export default RichTextEditor;
