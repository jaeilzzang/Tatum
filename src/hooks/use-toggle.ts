import { MouseEventHandler, useState } from "react";

export const useToggle = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle: MouseEventHandler = (e) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  return {
    toggle,
    handleToggle,
  };
};
