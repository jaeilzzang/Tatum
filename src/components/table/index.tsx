"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Table as RadixTable } from "@radix-ui/themes";
import React, { useState } from "react";

import styles from "./table.module.css";

type SortState = Record<string, boolean>;

export type TCell<T = string> = {
  label: string;
  value: T;
};

interface Props {
  /**
   * table data
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[];
  /**
   * table header
   */
  cell: TCell[];
}

const Table = ({ rows, cell }: Props) => {
  // todo sort 구현
  const initSortState = cell.reduce((acc, cur) => {
    acc[cur.value] = true;
    return acc;
  }, {} as SortState);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState<SortState>(() => initSortState);

  const handleSort = (key: string) => {
    setSort((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Flex align={"center"} direction={"column"}>
      <RadixTable.Root>
        <RadixTable.Header>
          <RadixTable.Row>
            {cell.map(({ label, value }, i) => (
              <RadixTable.ColumnHeaderCell
                key={i}
                width={"200px"}
                align="center"
                onClick={() => handleSort(value)}
                className={styles.header_cell}
              >
                <div className={styles.cell}>
                  {label}

                  {/* todo sort 구현 */}
                  {/* {sort[name] ? <ArrowDownIcon /> : <ArrowUpIcon />} */}
                </div>
              </RadixTable.ColumnHeaderCell>
            ))}
          </RadixTable.Row>
        </RadixTable.Header>

        <RadixTable.Body>
          {rows.map((row, rowIndex) => (
            <RadixTable.Row key={rowIndex}>
              {cell.map(({ value }, cellIndex) => {
                return (
                  <RadixTable.Cell key={cellIndex}>
                    {row[value]}
                  </RadixTable.Cell>
                );
              })}
            </RadixTable.Row>
          ))}
        </RadixTable.Body>
      </RadixTable.Root>

      {/* NO DATA */}
      {!rows.length && (
        <Flex align={"center"} height={"20vh"}>
          NO DATA
        </Flex>
      )}
    </Flex>
  );
};

export default Table;
