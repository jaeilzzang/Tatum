import {
  Flex,
  Text,
  Checkbox as RadixCheckbox,
  CheckboxProps,
} from "@radix-ui/themes";
import React from "react";

interface Props extends CheckboxProps {
  id: string;
  label: string;
}

const Checkbox = ({ id, label, ...props }: Props) => {
  return (
    <Text as="label" size="2">
      <Flex gap="2">
        <RadixCheckbox id={id} {...props} />
        {label}
      </Flex>
    </Text>
  );
};

export default Checkbox;
