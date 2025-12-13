import React from "react";
import FormShellMCA from "@/components/forms/FormShellMCA";
import MCAFormAPI from "@/components/wispfi/MCAFormAPI";

export default function MCAFormFloat() {
  return (
    <div className="hidden lg:block rounded-xl border border-white/20 bg-white/80 backdrop-blur-md p-3 sm:p-5 shadow-2xl order-1 lg:order-2 w-full max-w-[520px] mx-auto lg:ml-auto lg:mr-0 self-start" id="mca-form-float">
      <FormShellMCA variant="mca-ef">
        <MCAFormAPI />
      </FormShellMCA>
    </div>
  );
}