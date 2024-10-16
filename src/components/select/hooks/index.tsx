import { useContext } from "react";
import { SelectContext } from "../provider";

const useSelect = () => {
  const context = useContext(SelectContext);

  if (!context) {
    throw Error("use select context error");
  }

  return context;
};

export default useSelect;
