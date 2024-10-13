import { Text } from "@radix-ui/themes";
import React from "react";

import styles from "./count.module.css";

interface Props {
  count: number;
}

const Count = ({ count }: Props) => {
  return (
    <div className={styles.selected}>
      <Text>Selected </Text>
      <div className={styles.count}>{count}</div>
    </div>
  );
};

export default Count;
