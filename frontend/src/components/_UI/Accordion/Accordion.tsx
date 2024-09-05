"use client";
import { FAQ } from "@/src/lib/types/faq/FAQ.types";
import { Accordion } from "@mantine/core";
import React from "react";

const UIAccordion: React.FC<FAQ> = ({ question_reponse }) => {
  const items = question_reponse.map((faq) => (
    <Accordion.Item key={faq.question} value={faq.question}>
      <Accordion.Control className="text-sm">{faq.question}</Accordion.Control>
      <Accordion.Panel className="px-2 text-sm lg:px-5 lg:text-base">
        {faq.reponse}
      </Accordion.Panel>
    </Accordion.Item>
  ));
  return (
    <div className="mx-5 lg:mx-60 xl:mx-96">
      <Accordion variant="separated" radius="md">
        {items}
      </Accordion>
    </div>
  );
};

export default UIAccordion;
