import hematology from "./hematology";
import hemostasisAndThrombosis from "./hemostasisAndThrombosis";

const hematolodyDetails = {
  displayName: "hematology" as const,
  list: hematology,
};

const hemostasisAndThrombosisDetails = {
  displayName: "hemostasis_and_thrombosis" as const,
  list: hemostasisAndThrombosis,
};

export {
  hematolodyDetails as hematology,
  hemostasisAndThrombosisDetails as hemostasisAndThrombosis,
};
