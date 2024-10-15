import hematology from "@/lib/utils/bookHelper/hematology";
import hemostasisAndThrombosis from "@/lib/utils/bookHelper/hemostasisAndThrombosis";
import immunohematology from "@/lib/utils/bookHelper/immunohematology";
import immunology from "@/lib/utils/bookHelper/immunology";
import laboratoryOperations from "@/lib/utils/bookHelper/laboratoryOperations";
import microbiology from "@/lib/utils/bookHelper/microbiology";

const hematolodyDetails = {
  displayName: "hematology" as const,
  list: hematology,
};
const hemostasisAndThrombosisDetails = {
  displayName: "hemostasis_and_thrombosis" as const,
  list: hemostasisAndThrombosis,
};
const immunohematologyDetails = {
  displayName: "immunohematology" as const,
  list: immunohematology,
};
const immunologyDetails = {
  displayName: "immunology" as const,
  list: immunology,
};
const laboratoryOperationsDetails = {
  displayName: "laboratory_operations" as const,
  list: laboratoryOperations,
};
const microbiologyDetails = {
  displayName: "microbiology" as const,
  list: microbiology,
};

export {
  hematolodyDetails as hematology,
  hemostasisAndThrombosisDetails as hemostasisAndThrombosis,
  immunohematologyDetails as immunohematology,
  immunologyDetails as immunology,
  laboratoryOperationsDetails as laboratoryOperations,
  microbiologyDetails as microbiology,
};
