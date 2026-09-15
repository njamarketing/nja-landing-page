"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export default function WebsiteBenefitsAccordion({ items }: {
  items: { title: string; description: string; icon: ReactNode }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const id = useId();

  return (
    <div className="mt-8 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] md:hidden">
      {items.map((item, index) => {
        const open = openIndex === index;
        const triggerId = `${id}-${index}-trigger`;
        const panelId = `${id}-${index}-panel`;

        return (
          <div key={item.title}>
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex min-h-18 w-full cursor-pointer items-center gap-3 px-4 py-4 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-cyan"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-brand-cyan/15 bg-brand-cyan/5 text-brand-cyan">
                  {item.icon}
                </span>
                <span className="flex-1 text-sm leading-5 font-semibold">{item.title}</span>
                <ChevronDown className={`size-4 shrink-0 text-brand-cyan transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              aria-labelledby={triggerId}
              aria-hidden={!open}
              inert={!open}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="px-4 pb-5 pl-16 text-sm leading-6 text-white/60">{item.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
