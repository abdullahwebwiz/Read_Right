import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import "./postbuilder.css";
const Editor = ({ postbody }) => {
  const editor = useRef(null);
  let [content, setContent] = useState(
    postbody
      ? postbody
      : localStorage.getItem("postbody")
      ? localStorage.getItem("postbody")
      : ""
  );
  const config = {
    zIndex: 0,
    readonly: false,
    activeButtonsInReadOnly: ["source", "fullsize", "print", "about"],
    toolbarButtonSize: "middle",
    theme: "default",
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    spellcheck: true,
    editorCssClass: false,
    triggerChangeEvent: true,
    height: "100vh",
    width: "70%",
    direction: "ltr",
    language: "en",
    debugLanguage: false,
    i18n: "en",
    tabIndex: -1,
    toolbar: true,
    enter: "P",
    useSplitMode: false,
    colorPickerDefaultTab: "background",
    disablePlugins: ["paste", "stat"],
    events: {},
    textIcons: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
    placeholder: "Start editing your post...",
    showXPathInStatusbar: false,
  };

  return (
    <>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => {
          setContent(newContent);
          localStorage.setItem("postbody", newContent);
        }}
        onChange={(newContent) => {
          localStorage.setItem("postbody", newContent);
        }}
        className={"editor"}
      />
    </>
  );
};
export default React.memo(Editor);
