// "use client";

import { Close } from "@radix-ui/react-dialog";
import React, { forwardRef, PropsWithChildren } from "react";
import styles from "./dialog.module.css";
import { Button, Theme } from "@radix-ui/themes";
import { CheckIcon } from "@radix-ui/react-icons";
import { ButtonProps } from "@radix-ui/themes/src/index.js";

interface Props extends ButtonProps {
  label: string;
}

const DialogFooter = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  ({ label, ...props }, ref) => {
    return (
      <Theme scaling="100%">
        <div ref={ref} className={styles.dialog_footer}>
          <Close asChild>
            <Button color="gray" variant="surface" highContrast>
              Cancel
            </Button>
          </Close>

          <Button {...props} type="submit" color="green">
            <CheckIcon />
            {label}
          </Button>
        </div>
      </Theme>
    );
  }
);

DialogFooter.displayName = "DialogFooter";

export default DialogFooter;
