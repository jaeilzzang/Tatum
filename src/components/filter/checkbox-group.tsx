import React, { useMemo, useState } from "react";
import Checkbox from "./checkbox";

interface Props {
  item: {
    id: string;
    name: string;
  }[];
}

type State = Record<string, boolean>;

const CheckboxGroup = ({ item }: Props) => {
  const newFilterList = [{ id: "all", name: "ALL" }, ...item];

  const allChecked = (checked: boolean) =>
    newFilterList.reduce((acc, { id }) => {
      acc[id] = checked;
      return acc;
    }, {} as State);

  const [checkState, setCheckState] = useState<State>(() => allChecked(true));

  const allCheckedFilter = Object.keys(checkState).filter((id) => id !== "all");

  const isAllChecked = useMemo(() => {
    return allCheckedFilter.every((id) => checkState[id]);
  }, [checkState]);

  return (
    <>
      {newFilterList.map(({ id, name }) => {
        return (
          <Checkbox
            color="teal"
            key={id}
            id={id}
            label={name}
            checked={id === "all" ? isAllChecked : checkState[id]}
            onCheckedChange={(checked) => {
              setCheckState((prev) => {
                if (id === "all") {
                  return {
                    ...prev,
                    ...allChecked(Boolean(checked)),
                  };
                }

                return {
                  ...prev,
                  [id]: Boolean(checked),
                };
              });
            }}
          />
        );
      })}
    </>
  );
};

export default CheckboxGroup;
