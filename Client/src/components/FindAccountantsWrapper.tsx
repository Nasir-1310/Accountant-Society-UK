"use client";

import { useState } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import FindAccountantForm from "./FindAccountantsForm";

// The member directory isn't connected to real data yet, so a search shows
// an honest notice rather than sample results.
export default function FindAccountantWrapper() {
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <div>
      <FindAccountantForm onSearch={() => setHasSearched(true)} />

      {hasSearched && (
        <div role="status" className="mx-auto mt-8 flex max-w-4xl gap-4 rounded-2xl border border-brand-100 bg-brand-50 p-6">
          <Info aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-700" />
          <div>
            <p className="font-semibold text-brand-950">Our online member directory isn&apos;t available yet</p>
            <p className="mt-1 text-sm text-slate-600">
              Please{" "}
              <Link href="/contact-us" className="font-semibold text-brand-800 underline hover:text-brand-600">
                contact us
              </Link>{" "}
              for help finding a TPAS member accountant.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
