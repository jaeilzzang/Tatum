"use client";

import { Text, TextField as RadixTextField } from "@radix-ui/themes";
import React, { ComponentProps } from "react";
import styles from "./text-field.module.css";
import { clsx } from "clsx";

type TextFieldType = ComponentProps<typeof RadixTextField.Root>;

interface Props extends TextFieldType {
  label: string;
  errorMessage?: string;
}

const TextField = (props: Props) => {
  const { label, errorMessage } = props;

  const errorStyle = clsx({ [styles.error]: errorMessage });

  return (
    <label>
      <Text as="div" size="2" mb="1" weight="bold" className={errorStyle}>
        {label}
      </Text>
      <RadixTextField.Root
        {...props}
        className={clsx({
          [styles.input_error]: errorMessage,
        })}
      />

      {errorMessage && (
        <Text as="div" size="2" my="1" weight="bold" className={errorStyle}>
          {errorMessage}
        </Text>
      )}
    </label>
  );
};

export default TextField;
