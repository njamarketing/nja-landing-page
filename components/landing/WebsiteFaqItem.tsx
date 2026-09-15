"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function WebsiteFaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="py-5">
      <h3>
        <button
          type="button"
          id={`${id}-trigger`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((current) => !current)}
          className="flex w-full cursor-pointer items-center justify-between gap-5 rounded-sm text-left text-sm leading-7 font-medium text-white/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan"
        >
          {question}
          <ChevronDown
            className={`size-4 shrink-0 text-brand-cyan transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        aria-labelledby={`${id}-trigger`}
        aria-hidden={!open}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="pt-4 pr-8 text-sm leading-7 text-white/60">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
