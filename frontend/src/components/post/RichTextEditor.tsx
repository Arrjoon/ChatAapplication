"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import CKEditor to avoid SSR issues
const CKEditor = dynamic(
  () => {
    return import("@ckeditor/ckeditor5-react").then((mod) => {
      return {
        default: mod.CKEditor,
      };
    });
  },
  { ssr: false }
);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor = ({ value, onChange, placeholder, className }: RichTextEditorProps) => {
  const [Editor, setEditor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dynamically import ClassicEditor
    Promise.all([
      import("@ckeditor/ckeditor5-build-classic"),
      import("@ckeditor/ckeditor5-react"),
    ]).then(([ClassicEditorModule, CKEditorReactModule]) => {
      setEditor({
        ClassicEditor: ClassicEditorModule.default,
        CKEditor: CKEditorReactModule.CKEditor,
      });
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !Editor) {
    return (
      <div
        className={`${className} border border-gray-300 rounded-md p-4 min-h-[400px] bg-gray-50 flex items-center justify-center`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Editor.CKEditor
        editor={Editor.ClassicEditor}
        data={value}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          placeholder: placeholder || "Write your content here...",
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "|",
            "link",
            "blockQuote",
            "insertTable",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "outdent",
            "indent",
            "|",
            "imageUpload",
            "mediaEmbed",
            "|",
            "alignment",
            "|",
            "fontSize",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "horizontalLine",
            "|",
            "undo",
            "redo",
          ],
        }}
      />
      <style jsx global>{`
        .ck-editor__editable {
          min-height: 400px;
          font-size: 16px;
        }
        .ck-content {
          min-height: 400px;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
