import { format, parseISO } from "date-fns";

export function formatISOToDate(isoString: string): string {
  try {
    const date = parseISO(isoString);
    return format(date, "dd/MM/yyyy");
  } catch {
    return "";
  }
}
