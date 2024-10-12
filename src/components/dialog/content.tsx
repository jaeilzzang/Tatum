import { Overlay, Content } from "@radix-ui/react-dialog";
import { Portal, Theme } from "@radix-ui/themes";
import { forwardRef, PropsWithChildren } from "react";

import styles from "./dialog.module.css";

const DialogContent = forwardRef<HTMLDivElement, PropsWithChildren>(
  ({ children }: PropsWithChildren, ref) => {
    return (
      <Portal>
        <Overlay className={styles.Overlay} />
        <Content ref={ref} className={styles.Content}>
          <Theme>{children}</Theme>
        </Content>
      </Portal>
    );
  }
);

DialogContent.displayName = "DialogContent";

export default DialogContent;
