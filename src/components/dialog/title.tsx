import { forwardRef, PropsWithChildren } from "react";
import styles from "./dialog.module.css";

import { Title } from "@radix-ui/react-dialog";

interface DialogTitleProps {
  title: string;
  Icons: React.ReactNode;
}

const DialogTitle = forwardRef<
  HTMLDivElement,
  PropsWithChildren<DialogTitleProps>
>(({ title, Icons }, ref) => {
  return (
    <div className={styles.dialog_title}>
      <div className={styles.icon}>{Icons}</div>
      <Title ref={ref} className={styles.title}>
        {title}
      </Title>
    </div>
  );
});

DialogTitle.displayName = "DialogTitle";

export default DialogTitle;
