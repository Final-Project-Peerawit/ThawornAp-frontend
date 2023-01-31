import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Texteditor = () => {
  const modules = { toolbar: { container } };

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Write Something..."
      />
    </div>
  );
};

let container = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"],
  [{ color: [] }],
];

export default Texteditor;
