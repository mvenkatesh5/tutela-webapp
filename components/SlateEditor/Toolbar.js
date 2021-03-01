import React from "react";
// slate js
import { createEditor, Transforms, Editor, Text, Node, Element, Range, Point } from "slate";
// material icons
import {
  ListOl,
  ListUl,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Highlighter,
  Subscript,
  Superscript,
  Link,
  Table,
} from "@styled-icons/fa-solid";

const toolbarBlockContentHeading = [
  { kind: "item", icon: <Heading />, label: "Heading 1", format: "heading-1" },
  { kind: "item", icon: <Heading />, label: "Heading 2", format: "heading-2" },
  { kind: "item", icon: <Heading />, label: "Heading 3", format: "heading-3" },
];

const toolbarBlockContentList = [
  { kind: "item", icon: <ListOl />, label: "Numbered List", format: "numbered-list" },
  { kind: "item", icon: <ListUl />, label: "Bulleted List", format: "bulleted-list" },
];
const LIST_TYPES = ["numbered-list", "bulleted-list"];

const toolbarBlockContentAlignment = [
  { kind: "item", icon: <AlignLeft />, label: "Left-Alignment", format: "left-alignment" },
  { kind: "item", icon: <AlignCenter />, label: "Center-Alignment", format: "center-alignment" },
  { kind: "item", icon: <AlignRight />, label: "Right-Alignment", format: "right-alignment" },
];
const ALIGNMENT_TYPES = ["left-alignment", "center-alignment", "right-alignment"];

const toolbarInlineBlockContent = [
  { kind: "item", icon: <Bold />, label: "Bold", format: "bold" },
  { kind: "item", icon: <Italic />, label: "Italic", format: "italic" },
  { kind: "item", icon: <Underline />, label: "Underline", format: "underline" },
  { kind: "item", icon: <Strikethrough />, label: "Strike-Through", format: "strikeThrough" },
  { kind: "item", icon: <Highlighter />, label: "Inline-Code", format: "inlineCode" },
];

const toggleSelectedBlock = (editor, format) => {
  const [cell] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table-cell",
  });

  if (!cell) {
    const isActive = isBlockActive(editor, format);

    Transforms.unwrapNodes(editor, {
      match: (n) => LIST_TYPES.includes(!Editor.isEditor(n) && Element.isElement(n) && n.type),
    });
    const newProperties = {
      type: isActive ? "paragraph" : format,
    };
    Transforms.setNodes(editor, newProperties);
  }
};

// list
const toggleListSelectedBlock = (editor, format) => {
  const [cell] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table-cell",
  });

  if (!cell) {
    const isActive = isBlockActive(editor, format);
    let isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) => LIST_TYPES.includes(!Editor.isEditor(n) && Element.isElement(n) && n.type),
      split: true,
    });
    const newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
    Transforms.setNodes(editor, newProperties);
    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  }
};

// alignment
const toggleAlignmentSelectedBlock = (editor, format) => {
  const [cell] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table-cell",
  });

  if (!cell) {
    const isActive = isBlockActive(editor, format);
    let isAlignment = ALIGNMENT_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) => ALIGNMENT_TYPES.includes(!Editor.isEditor(n) && Element.isElement(n) && n.type),
      split: true,
    });

    if (!isActive && isAlignment) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  } else {
    const isActive = isBlockActive(editor, format);
    let isAlignment = ALIGNMENT_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) => ALIGNMENT_TYPES.includes(!Editor.isEditor(n) && Element.isElement(n) && n.type),
    });

    if (!isActive && isAlignment) {
      const block = { type: format, children: [] };
      Transforms.setNodes(editor, block);
      const nextBlock = { type: "table-cell", children: [] };
      Transforms.wrapNodes(editor, nextBlock);
    }
  }
};

// table
const toggleTableSelectedBlock = {
  insert(editor, format) {
    const isActive = isBlockActive(editor, format);
    if (isActive) {
      return;
    }
    const newProperties = {
      type: "table",
      children: [
        {
          type: "table-row",
          children: [
            {
              type: "table-cell",
              children: [{ text: "" }],
            },
            {
              type: "table-cell",
              children: [{ text: "" }],
            },
            {
              type: "table-cell",
              children: [{ text: "" }],
            },
          ],
        },
        {
          type: "table-row",
          children: [
            {
              type: "table-cell",
              children: [{ text: "" }],
            },
            {
              type: "table-cell",
              children: [{ text: "" }],
            },
            {
              type: "table-cell",
              children: [{ text: "" }],
            },
          ],
        },
        {
          type: "table-row",
          children: [
            {
              type: "table-cell",
              children: [{ text: "" }],
            },
            {
              type: "table-cell",
              children: [{ text: "" }],
            },
            {
              type: "table-cell",
              children: [{ text: "" }],
            },
          ],
        },
      ],
    };
    Transforms.insertNodes(editor, newProperties);
  },

  addRow(editor, format) {
    const [table] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table",
    });
    const [tableRow] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table-row",
    });
    const [cell] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table-cell",
    });
    if (table) {
      Transforms.removeNodes(editor, {
        match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table",
      });
      const currentRowIndex = tableRow[1][1];
      let rowColumnData = table[0].children[0].children;
      let newTableRowChildren = [];
      for (let i in rowColumnData) {
        let data = {
          type: "table-cell",
          children: [{ text: "" }],
        };
        newTableRowChildren.push(data);
      }
      newTableRowChildren = {
        type: "table-row",
        children: newTableRowChildren,
      };
      let currentTable = JSON.parse(JSON.stringify(table[0]));
      currentTable.children.splice(currentRowIndex + 1, 0, newTableRowChildren);
      Transforms.insertNodes(editor, currentTable);
    }
  },

  deleteRow(editor, format) {
    const [table] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table",
    });
    const [tableRow] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table-row",
    });
    const [cell] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table-cell",
    });
    if (table) {
      Transforms.removeNodes(editor, {
        match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table",
      });
      const currentRowIndex = tableRow[1][1];
      let rowColumnData = table[0].children[0].children;
      let newTableRowChildren = [];
      for (let i in rowColumnData) {
        let data = {
          type: "table-cell",
          children: [{ text: "" }],
        };
        newTableRowChildren.push(data);
      }
      newTableRowChildren = {
        type: "table-row",
        children: newTableRowChildren,
      };
      let currentTable = JSON.parse(JSON.stringify(table[0]));
      currentTable.children.splice(currentRowIndex, 1);
      Transforms.insertNodes(editor, currentTable);
    }
  },

  addColumn(editor, format) {
    const [table] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table",
    });
    const [tableRow] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table-row",
    });
    const [tableCell] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table-cell",
    });

    if (table) {
      Transforms.removeNodes(editor, {
        match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table",
      });

      const currentRowIndex = tableRow[1][1];
      const currentColIndex = tableCell[1][2];

      let currentTable = JSON.parse(JSON.stringify(table[0]));
      currentTable.children.map((row, rowIndex) => {
        let data = {
          type: "table-cell",
          children: [{ text: "" }],
        };
        row.children.splice(currentColIndex + 1, 0, data);
      });

      Transforms.insertNodes(editor, currentTable);
    }
  },

  deleteColumn(editor, format) {
    const [table] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table",
    });
    const [tableRow] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table-row",
    });
    const [tableCell] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table-cell",
    });

    if (table) {
      Transforms.removeNodes(editor, {
        match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table",
      });

      const currentRowIndex = tableRow[1][1];
      const currentColIndex = tableCell[1][2];

      let currentTable = JSON.parse(JSON.stringify(table[0]));
      currentTable.children.map((row, rowIndex) => {
        let data = {
          type: "table-cell",
          children: [{ text: "" }],
        };
        row.children.splice(currentColIndex, 1);
      });

      Transforms.insertNodes(editor, currentTable);
    }
  },

  deleteTable(editor, format) {
    const [table] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table",
    });
    const [tableRow] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table-row",
    });
    const [tableCell] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table-cell",
    });
    if (table) {
      Transforms.removeNodes(editor, {
        match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table",
      });
      const newProperties = {
        type: "paragraph",
        children: [{ text: "" }],
      };
      Transforms.insertNodes(editor, newProperties);
    }
  },
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
  });
  return !!match;
};

const toggleSelectedMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
const toggleSelectedColorMark = (editor, format, color) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, color);
  }
};
const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

// Link tag
const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
  });
  return !!link;
};
const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
  });
};
export const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);

  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const EditorToolbar = (props) => {
  React.useEffect(() => {
    const toggles = document.querySelectorAll(".toolbar-item.dropdown-container");
    if (toggles.length > 0) {
      for (let i = 0; i < toggles.length; i++) {
        toggles[i].addEventListener("click", () => {
          toggles[i].querySelector(".dropdown-content-list").classList.toggle("list-active");
        });
      }
      document.addEventListener("click", (event) => {
        if (
          event.target.classList &&
          event.target.classList.contains(`dropdown-container`) === false &&
          event.target.parentNode &&
          event.target.parentNode.classList &&
          event.target.parentNode.classList.contains(`dropdown-container`) === false &&
          event.target.parentNode.parentNode &&
          event.target.parentNode.parentNode.classList &&
          event.target.parentNode.parentNode.classList.contains(`dropdown-container`) === false
        ) {
          if (document.querySelector("div.dropdown-content-list.color"))
            document
              .querySelector("div.dropdown-content-list.color")
              .classList.remove("list-active");
          if (document.querySelector("div.dropdown-content-list.bg-color"))
            document
              .querySelector("div.dropdown-content-list.bg-color")
              .classList.remove("list-active");
        }
      });
    }
  }, []);

  return (
    <div>
      <div className="slate-toolbar-container">
        {/* heading */}
        {/* {toolbarBlockContentHeading.map((block, blockIndex) => (
          <div
            title={block.label}
            key={block.label}
            className={
              `toolbar-item ` + (isBlockActive(props.editor, block.format) ? "active" : "")
            }
            onMouseDown={(event) => {
              event.preventDefault();
              toggleSelectedBlock(props.editor, block.format);
            }}
          >
            {block.icon}
            <span className="item-sub-script">{blockIndex + 1}</span>
          </div>
        ))}
        <div className="toolbar-item toolbar-divider"></div> */}

        {/* lists */}
        {toolbarBlockContentList.map((block, blockIndex) => (
          <div
            title={block.label}
            key={block.label}
            className={
              `toolbar-item ` + (isBlockActive(props.editor, block.format) ? "active" : "")
            }
            onMouseDown={(event) => {
              event.preventDefault();
              toggleListSelectedBlock(props.editor, block.format);
            }}
          >
            {block.icon}
          </div>
        ))}
        <div className="toolbar-item toolbar-divider"></div>

        {/* alignment */}
        {/* {toolbarBlockContentAlignment.map((block, blockIndex) => (
          <div
            className="toolbar-item"
            title={block.label}
            key={block.label}
            className={
              `toolbar-item ` + (isBlockActive(props.editor, block.format) ? "active" : "")
            }
            onMouseDown={(event) => {
              event.preventDefault();
              toggleAlignmentSelectedBlock(props.editor, block.format);
            }}
          >
            {block.icon}
          </div>
        ))}
        <div className="toolbar-item toolbar-divider"></div> */}

        {/* inline styling */}
        {toolbarInlineBlockContent.map((block) => (
          <div
            title={block.label}
            key={block.label}
            className={`toolbar-item ` + (isMarkActive(props.editor, block.format) ? "active" : "")}
            onMouseDown={(event) => {
              event.preventDefault();
              toggleSelectedMark(props.editor, block.format);
            }}
          >
            {block.icon}
          </div>
        ))}
        <div className="toolbar-item toolbar-divider"></div>

        {/* link tag implementation */}
        <div
          title={`Link`}
          key={`Link`}
          className={`toolbar-item ` + (isLinkActive(props.editor) ? "active" : "")}
          onMouseDown={(event) => {
            event.preventDefault();
            const url = window.prompt("Enter the URL of the link:", "https://google.com");
            if (!url) return;
            insertLink(props.editor, url);
          }}
        >
          <Link />
        </div>
        <div className="toolbar-item toolbar-divider"></div>

        {/* table */}
        {/* <div
          className={`toolbar-item ` + (isBlockActive(props.editor, "table") ? "active" : "")}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleTableSelectedBlock.insert(props.editor, "table");
          }}
          title={`Insert Table`}
        >
          <Table />
        </div>
        <div
          className={`toolbar-item ` + (isBlockActive(props.editor, "table") ? "active" : "")}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleTableSelectedBlock.addRow(props.editor, "table");
          }}
          title={`Add Row`}
        >
          Ar
        </div>
        <div
          className={`toolbar-item ` + (isBlockActive(props.editor, "table") ? "active" : "")}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleTableSelectedBlock.deleteRow(props.editor, "table");
          }}
          title={`Delete Row`}
        >
          Dr
        </div>
        <div
          className={`toolbar-item ` + (isBlockActive(props.editor, "table") ? "active" : "")}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleTableSelectedBlock.addColumn(props.editor, "table");
          }}
          title={`Add Column`}
        >
          Ac
        </div>
        <div
          className={`toolbar-item ` + (isBlockActive(props.editor, "table") ? "active" : "")}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleTableSelectedBlock.deleteColumn(props.editor, "table");
          }}
          title={`Delete Column`}
        >
          Dc
        </div>
        <div
          className={`toolbar-item ` + (isBlockActive(props.editor, "table") ? "active" : "")}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleTableSelectedBlock.deleteTable(props.editor, "table");
          }}
          title={`Delete Table`}
        >
          Dt
        </div>
        <div className="toolbar-item toolbar-divider"></div> */}

        <div
          className={`toolbar-item ` + (isMarkActive(props.editor, "subScript") ? "active" : "")}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleSelectedMark(props.editor, "subScript");
          }}
        >
          <Subscript />
        </div>
        <div
          className={`toolbar-item ` + (isMarkActive(props.editor, "superScript") ? "active" : "")}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleSelectedMark(props.editor, "superScript");
          }}
        >
          <Superscript />
        </div>
      </div>
    </div>
  );
};

export default EditorToolbar;
