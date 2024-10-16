"use client";

import { Button as RadixButton, ButtonProps } from "@radix-ui/themes";
import React from "react";

import styles from "./button.module.css";

interface Props extends ButtonProps {}

const Button = (props: Props) => {
  return (
    <RadixButton className={styles.button} {...props}>
      {props.children}
    </RadixButton>
  );
};

export default Button;
