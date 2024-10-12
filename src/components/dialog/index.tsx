import { Root } from "@radix-ui/react-dialog";

import React, { PropsWithChildren } from "react";
import DialogOpen from "./open";
import DialogTitle from "./title";
import DialogContent from "./content";
import DialogFooter from "./footer";

type DialogComponent = React.FC<PropsWithChildren> & {
  Title: typeof DialogTitle;
  Content: typeof DialogContent;
  Open: typeof DialogOpen;
  Footer: typeof DialogFooter;
};

const Dialog: DialogComponent = ({ children }: PropsWithChildren) => {
  return <Root>{children}</Root>;
};

Dialog.Title = DialogTitle;
Dialog.Content = DialogContent;
Dialog.Open = DialogOpen;
Dialog.Footer = DialogFooter;

export default Dialog;
