import { useEffect, useState } from "react";
import {
  deleteGetStorageData,
  storeStorageData,
} from "@/lib/utils/asyncStorage";
import { GALAXY_INDEX } from "@/constants/AsyncStorageKeys";
import { randomMinMax } from "@/lib/utils/random";
import { galaxyNames } from "@/constants/Galaxy";
import debugMessage from "@/lib/utils/debugMessage";
import { BASE_HEXADECIMAL, STARTING_INDEX } from "@/constants/Numbers";

export default function useGalaxyIndex() {
  const [state, setState] = useState(STARTING_INDEX);

  /** Helper function for parsing galaxy index value from AsyncStorage. */
  function setGalaxyIndex(index: string) {
    const parsedIndex = parseInt(index, BASE_HEXADECIMAL);
    if (isNaN(parsedIndex)) return debugMessage(`${index} is not a number!`);
    setState(parsedIndex);
  }

  useEffect(() => {
    async function getGalaxyIndex() {
      const galaxyIndex = await deleteGetStorageData({
        key: GALAXY_INDEX,
        method: "get",
      });

      // Generate a random index and store it in the AsyncStorage.
      if (galaxyIndex === undefined) {
        const computedIndex = randomMinMax(
          STARTING_INDEX,
          galaxyNames.length - 1
        );
        const result = await storeStorageData({
          key: GALAXY_INDEX,
          value: `${computedIndex}`,
          method: "set",
        });
        return setGalaxyIndex(result);
      }

      if (typeof galaxyIndex === "string") setGalaxyIndex(galaxyIndex);
    }
    void getGalaxyIndex();
  }, []);

  return state;
}
