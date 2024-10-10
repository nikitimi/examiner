import AsyncStorage from "@react-native-async-storage/async-storage";

type StoreStorageData<T> = {
  key: string;
  value: T;
  /**
   * `read` stores the key and value directly while `set` updates the value based on the key provided.
   */
  method: "set" | "update";
};

type ModifyStorageData = {
  key: string | string[];
  /**
   * `get` is used for retrieving the data based on the key,
   * while `delete` will remove the key-value pairs in local storage,
   * lastly `keys` will provide all the keys stored in local storage.
   */
  method: "get" | "delete" | "keys";
};

export async function storeStorageData<T>(props: StoreStorageData<T>) {
  const { key, value, method } = props;
  const finalValue = typeof value === "string" ? value : JSON.stringify(value);

  switch (method) {
    case "set":
      await AsyncStorage.setItem(key, finalValue);
      return `Successfully added ${key} in local storage!`;

    case "update":
      const data = await deleteGetStorageData({ key, method: "get" });

      if (data === null) return `Key ${key} is not found!`;
      await AsyncStorage.setItem(key, finalValue);
      return `Successfully change the value of ${key} in local storage to ${value}!`;

    default:
      return "No store method used.";
  }
}
export async function deleteGetStorageData(props: ModifyStorageData) {
  const { key, method } = props;
  const isKeyIsIndividual = typeof key === "string";

  switch (method) {
    case "get":
      if (isKeyIsIndividual) return await AsyncStorage.getItem(key);
      return await AsyncStorage.multiGet(key);

    case "delete":
      let addedKey = "";
      const lastIndexOfIndexer = addedKey.lastIndexOf(",");
      const formattedKey = method.toLocaleUpperCase();

      if (isKeyIsIndividual) {
        await AsyncStorage.removeItem(key);
        return `${formattedKey} is used in ${key}.`;
      }

      await AsyncStorage.multiRemove(key);
      key.forEach((v) => (addedKey += `${v}, `));
      return `${formattedKey} us used in keys: ${addedKey
        .substring(0, lastIndexOfIndexer)
        .trimEnd()}`;

    case "keys":
      return await AsyncStorage.getAllKeys();

    default:
      return null;
  }
}
