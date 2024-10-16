"use client";

import React from "react";

import { Flex, Heading } from "@radix-ui/themes";
import Avatar from "@/components/avatar";
import Count from "../count";
import Filter from "../filter";
import Table from "../table";
import SelectSearchForm from "../form/select-search";

type SelectSearchFormProps = React.ComponentProps<typeof SelectSearchForm>;
type FilterProps = React.ComponentProps<typeof Filter>;
type TableProps = React.ComponentProps<typeof Table>;
type HeadingProps = { title: string };

type Props = HeadingProps & SelectSearchFormProps & FilterProps & TableProps;

const ListPageTemplate = (props: Props) => {
  const { title, buttonName, filterItem, rows, cell } = props;

  return (
    <Flex m={"4"} direction={"column"} width={"100%"}>
      <Flex justify={"between"}>
        <Heading size="4">{title}</Heading>
        <Avatar />
      </Flex>

      <Flex gap={"4"} mt={"8"}>
        <SelectSearchForm buttonName={buttonName} />
      </Flex>

      <Flex mt={"8"} mb={"1"}>
        <Count count={rows.length} />
      </Flex>

      <Filter filterItem={filterItem} />

      <Flex my={"6"}>
        <Table rows={rows} cell={cell} />
      </Flex>
    </Flex>
  );
};

export default ListPageTemplate;
