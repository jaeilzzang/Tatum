"use client";

import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table as RadixTable } from "@radix-ui/themes";
import React, { useState } from "react";

import styles from "./table.module.css";

type SortState = Record<string, boolean>;

export type TCell<T> = {
  label: string;
  key: T;
};

interface Props<T = string> {
  /**
   * table data
   */
  rows: any[];
  /**
   * table header
   */
  cell: TCell<T>[];
}

const Table = ({ rows, cell }: Props) => {
  // todo sort 구현
  const initSortState = cell.reduce((acc, cur) => {
    acc[cur.key] = true;
    return acc;
  }, {} as SortState);

  const [sort, setSort] = useState<SortState>(() => initSortState);

  const handleSort = (key: string) => {
    setSort((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <RadixTable.Root>
      <RadixTable.Header>
        <RadixTable.Row>
          {cell.map(({ label, key }, i) => (
            <RadixTable.ColumnHeaderCell
              key={i}
              align="center"
              onClick={() => handleSort(key)}
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
            {cell.map(({ key }, cellIndex) => {
              console.log(row, key);
              return (
                <RadixTable.Cell key={cellIndex}>{row[key]}</RadixTable.Cell>
              );
            })}
          </RadixTable.Row>
        ))}
      </RadixTable.Body>
    </RadixTable.Root>
  );
};

export default Table;
