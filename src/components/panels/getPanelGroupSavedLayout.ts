import { cookies } from "next/headers";

export function getPanelGroupSavedLayout(autoSaveId: string): number[] {
  const layout = cookies().get(autoSaveId);
  if (layout) {
    try {
      return JSON.parse(layout.value);
    } catch (error) {
      console.error(error);
    }
  }

  return [];
}
