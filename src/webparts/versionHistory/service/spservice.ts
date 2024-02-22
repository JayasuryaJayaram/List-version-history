import { getSP } from "./pnpConfig";

export const getData = async () => {
  try {
    const sp = getSP();

    const items = await sp.web.lists
      .getByTitle("Approval_Request")
      .items.getAll();
    return items;
  } catch (error) {
    console.error("Error getting list details", error);
    throw error;
  }
};

export const getVersionHistory = async (itemId: number) => {
  try {
    const sp = getSP();

    const versions = await sp.web.lists
      .getByTitle("Approval_Request")
      .items.getById(itemId)
      .versions();
    return versions;
  } catch (error) {
    console.error("Error getting version history", error);
    throw error;
  }
};
