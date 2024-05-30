import { useLayoutEffect, useRef, useState, KeyboardEvent, ClipboardEvent } from "react";

import { selectAll } from "@/utils/selection";

enum EditState {
  Inactive,
  Active,
  Saving,
}

function pasteText(event: ClipboardEvent) {
  event.preventDefault();
  const text = event.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
}

const editableTitleClassname =
  "flex-initial  border-[2px] border-[solid] border-[transparent] rounded-[0.25em] font-[Inter,_sans-serif] text-[18px]  overflow-hidden overflow-ellipsis whitespace-nowrap";

// This component cloned from `<HeaderTitle>` in `devtools`

// This is a workaround for getting an automatically-resizing horizontal text input
// so that switching between the editing and non-editing states is smooth.
// https://stackoverflow.com/questions/45306325/react-contenteditable-and-cursor-position
export function EditableTitle({
  title,
  saveTitle,
  canEditTitle = true,
}: {
  title?: string;
  saveTitle: (title: string) => Promise<void>;
  canEditTitle?: boolean;
}) {
  const [editState, setEditState] = useState(EditState.Inactive);
  const contentEditableRef = useRef<HTMLSpanElement>(null);

  const hasTitle = title && title.length > 0;
  const displayTitle = hasTitle ? title : "Untitled";

  useLayoutEffect(() => {
    if (!contentEditableRef.current) {
      return;
    }

    if (!editState) {
      contentEditableRef.current.innerText = hasTitle ? title! : "Untitled";
    } else if (editState === EditState.Active && !hasTitle) {
      contentEditableRef.current.innerText = "";
    } else if (editState === EditState.Saving && !contentEditableRef.current.innerText) {
      contentEditableRef.current.innerText = "Untitled";
    }
  }, [editState, hasTitle, title]);

  if (!canEditTitle) {
    return (
      <span className={editableTitleClassname} data-testid="Editable-Title">
        {displayTitle}
      </span>
    );
  }

  const onKeyDownOrKeyPress = (event: KeyboardEvent) => {
    if (event.code == "Enter" || event.code == "Escape") {
      event.preventDefault();
      contentEditableRef.current!.blur();
    }
  };
  const onFocus = () => {
    setEditState(EditState.Active);

    const contentEditable = contentEditableRef.current;
    if (contentEditable) {
      selectAll(contentEditable);
    }
  };
  const onBlur = () => {
    const contentEditable = contentEditableRef.current;
    if (editState !== EditState.Active || !contentEditable) {
      return;
    }
    const currentValue = contentEditable.textContent || "";

    setEditState(EditState.Saving);
    saveTitle(currentValue).then(() => {
      setEditState(EditState.Inactive);
    });
  };

  return (
    <span
      data-testid="Editable-Title"
      className={editableTitleClassname}
      contentEditable
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDownOrKeyPress}
      onKeyPress={onKeyDownOrKeyPress}
      onPaste={pasteText}
      ref={contentEditableRef}
      role="textbox"
      spellCheck="false"
      tabIndex={0}
    />
  );
}
