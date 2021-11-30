// slate js
import { createEditor, Transforms, Editor, Text, Node, Element, Range, Point } from "slate";
// is-url;
import isUrl from "is-url";
// import from toolbar
import { wrapLink } from "../Toolbar";

const editorLink = (editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => {
    return element.type === "link" ? true : isInline(element);
  };

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export default editorLink;
