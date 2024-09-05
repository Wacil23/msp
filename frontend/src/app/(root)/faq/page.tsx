import Hero from "@/src/components/_Root/hero/hero";
import UIAccordion from "@/src/components/_UI/Accordion/Accordion";
import { directus } from "@/src/lib/directus";
import { FAQ } from "@/src/lib/types/faq/FAQ.types";
import { readSingleton } from "@directus/sdk";
import React from "react";

const Faq = async () => {
  const api = directus();
  const repsonse = await api.request<FAQ>(
    readSingleton("faq", {
      fields: ["question_reponse"],
    }),
  );
  return (
    <div className="flex flex-col gap-8 py-16">
      <Hero title={"Notre FAQ"} subtitle="Les questions fréquentes" />
      <UIAccordion question_reponse={repsonse.question_reponse} />
    </div>
  );
};

export default Faq;
