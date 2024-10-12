import { Trigger } from "@radix-ui/react-dialog";
import { forwardRef, PropsWithChildren } from "react";

const DialogOpen = forwardRef<HTMLButtonElement, PropsWithChildren>(
  ({ children }, ref) => {
    return (
      <Trigger asChild ref={ref}>
        {children}
      </Trigger>
    );
  }
);

DialogOpen.displayName = "DialogOpen";

export default DialogOpen;
