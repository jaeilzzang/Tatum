"use client";

import ListPageTemplate from "@/components/template/list-page";
import React, { ComponentProps } from "react";
import CreateTaskModal from "./modal/create-task";

type Props = ComponentProps<typeof ListPageTemplate>;

const ListContainer = (props: Props) => {
  return <ListPageTemplate {...props} buttonEl={<CreateTaskModal />} />;
};

export default ListContainer;
