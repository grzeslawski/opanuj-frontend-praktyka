import { ReactNode } from "react";

function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col items-start">
      {label}
      {children}
    </label>
  );
}
export default FormField;
