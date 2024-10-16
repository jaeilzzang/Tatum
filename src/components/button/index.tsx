"use client";

import { Button as RadixButton, ButtonProps } from "@radix-ui/themes";
import React, { forwardRef } from "react";

import styles from "./button.module.css";

interface Props extends ButtonProps {}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return (
    <RadixButton ref={ref} className={styles.button} {...props}>
      {props.children}
    </RadixButton>
  );
});

Button.displayName = "Button";

export default Button;
