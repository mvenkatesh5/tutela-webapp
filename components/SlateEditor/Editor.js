import React from "react";
// react bootstrap
import { Table } from "react-bootstrap";
// slate components
import { createEditor, Transforms, Editor, Text, Node, Element, Range, Point } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
// components
import { EditorToolbar, Heading1, Heading2, Heading3 } from "./index";
// helpers
import withTable from "./helpers/withTable";
import withImage from "./helpers/withImage";
import withLink from "./helpers/withLink";

const SlateEditor = (props) => {
  const editor = React.useMemo(
    () => withLink(withTable(withHistory(withReact(createEditor())))),
    []
  );
  const [value, setValue] = React.useState([]);

  const handleValue = (value) => {
    setValue(value);
    if (props.handleData) props.handleData(value);
  };

  React.useEffect(() => {
    if (props.initialValue && props.initialValue.length > 0 && Array.isArray(props.initialValue))
      setValue(props.initialValue);
    else
      setValue([
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ]);
  }, [props.initialValue]);

  // custom render elements
  const renderElement = React.useCallback((props) => {
    switch (props.element.type) {
      case "heading-1":
        return <Heading1 {...props} />;
      case "heading-2":
        return <Heading2 {...props} />;
      case "heading-3":
        return <Heading3 {...props} />;
      case "numbered-list":
        return <NumberedListElement {...props} />;
      case "bulleted-list":
        return <BulletedListElement {...props} />;
      case "list-item":
        return <ListItemElement {...props} />;
      case "left-alignment":
        return <LeftAlignmentElement {...props} />;
      case "center-alignment":
        return <CenterAlignmentElement {...props} />;
      case "right-alignment":
        return <RightAlignmentElement {...props} />;
      case "table":
        return <TableElement {...props} />;
      case "table-row":
        return <TableRowElement {...props} />;
      case "table-cell":
        return <TableColElement {...props} />;
      case "code":
        return <CodeElement {...props} />;
      case "link":
        return <AnchorElement {...props} />;
      case "paragraph":
        return <ParagraphElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // custom render leafs
  const renderLeaf = React.useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div>
      <div className={`slate-root-container ` + (props.readOnly ? "render" : "")}>
        {value && (
          <Slate editor={editor} value={value} onChange={(newValue) => handleValue(newValue)}>
            {!props.readOnly && <EditorToolbar editor={editor} Text={Text} value={value} />}
            <div className={`slate-content-container ` + (props.readOnly ? `p-0` : ``)}>
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                autoFocus
                readOnly={props.readOnly}
              />
            </div>
          </Slate>
        )}
      </div>
    </div>
  );
};

export default SlateEditor;

// list
const BulletedListElement = (props) => {
  return <ul {...props.attributes}>{props.children}</ul>;
};
const NumberedListElement = (props) => {
  return <ol {...props.attributes}>{props.children}</ol>;
};
const ListItemElement = (props) => {
  return <li {...props.attributes}>{props.children}</li>;
};
// alignment
const LeftAlignmentElement = (props) => {
  return (
    <div style={{ textAlign: "left" }} {...props.attributes}>
      {props.children}
    </div>
  );
};
const CenterAlignmentElement = (props) => {
  return (
    <div style={{ textAlign: "center" }} {...props.attributes}>
      {props.children}
    </div>
  );
};
const RightAlignmentElement = (props) => {
  return (
    <div style={{ textAlign: "right" }} {...props.attributes}>
      {props.children}
    </div>
  );
};
// table
const TableElement = (props) => {
  return (
    <Table bordered>
      <tbody {...props.attributes}>{props.children}</tbody>
    </Table>
  );
};
const TableRowElement = (props) => {
  return <tr {...props.attributes}>{props.children}</tr>;
};
const TableColElement = (props) => {
  return <td {...props.attributes}>{props.children}</td>;
};

const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const AnchorElement = (props) => {
  return (
    <a {...props.attributes} href={props.element.url}>
      {props.children}
    </a>
  );
};

const ParagraphElement = (props) => {
  return (
    <p className="m-0 p-0" {...props.attributes}>
      {props.children}
    </p>
  );
};

const DefaultElement = (props) => {
  return <span {...props.attributes}>{props.children}</span>;
};

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        color: props.leaf.color ? props.leaf.color : "#37352F",
        backgroundColor: props.leaf.bgColor ? props.leaf.bgColor : "transparent",
      }}
      className={
        (props.leaf.bold ? "sl-s-bold " : "") +
        (props.leaf.italic ? "sl-s-italic " : "") +
        (props.leaf.underline ? "sl-s-underline " : "") +
        (props.leaf.strikeThrough ? "sl-s-strikeThrough " : "") +
        (props.leaf.inlineCode ? "sl-s-inlineCode " : "") +
        (props.leaf.subScript ? "sl-s-subScript " : "") +
        (props.leaf.superScript ? "sl-s-superScript " : "")
      }
    >
      {props.children}
    </span>
  );
};
