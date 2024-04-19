import { IconButton } from "@/components/IconButton";
import useModalDismissSignal from "@/hooks/useModalDismissSignal";
import { MouseEvent, PropsWithChildren, ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

export function ModalDialog({
  children,
  onDismiss,
  title,
  ...rest
}: PropsWithChildren & {
  onDismiss: () => void;
  title: ReactNode;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useModalDismissSignal(modalRef, onDismiss);

  const dialog = (
    <div
      className="backdrop-blur overflow-y-auto cursor-default fixed top-0 left-0 w-full h-full z-40 flex justify-center items-center bg-black/50"
      data-test-name="ModalDialog"
      {...rest}
    >
      <div
        className="min-w-96 max-h-full rounded-lg shadow bg-slate-800 text-white flex flex-col gap-4 p-4 pt-2 relative"
        onClick={stopPropagation}
        ref={modalRef}
      >
        <div className="text-xl font-bold">{title}</div>
        <IconButton
          autoFocus
          className="absolute top-3 right-3"
          data-test-nam="ModalDialog-CloseButton"
          iconType="close"
          onClick={onDismiss}
        />
        {children}
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(dialog, document.body)
    : dialog;
}

function stopPropagation(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
}
