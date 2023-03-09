import React from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

const Texteditor = () => {
  const container = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
    [{ color: [] }],
  ];
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

export default Texteditor;
