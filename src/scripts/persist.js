import AsyncStorage from '@react-native-community/async-storage';

export default {
  setValue: async (strKey, jsonValue, version) => {
    console.log(`Persist adding ${strKey} `);
    try {
      await AsyncStorage.setItem(strKey,
        JSON.stringify({ data: jsonValue, version, ts: Date.now() }));
    } catch (e) {
      console.log('Failed to persist data for key: ', strKey, ' error: ', e);
    }
  },

  getValue: async (strKey, version, maxAgeInHrs) => {
    console.log(`Persist getting ${strKey} version: ${version} maxAgeInHrs: ${maxAgeInHrs}`);
    try {
      const value = await AsyncStorage.getItem(strKey);
      if (!value) {
        return null;
      }

      const jsonValue = JSON.parse(value);
      const curAgeInHrs = (Date.now() - jsonValue.ts) / 1000 / 60 / 60;
      if ((version !== jsonValue.version) || ((curAgeInHrs > maxAgeInHrs) && (maxAgeInHrs !== 0))) {
        await AsyncStorage.removeItem(strKey);
        return null;
      }

      return jsonValue.data;
    } catch (e) {
      console.log('Failed to get persisted data for key: ', strKey, ' error: ', e);
      return null;
    }
  },

  getMultiValues: async (strKeyList, version, maxAgeInHrs) => {
    console.log(`Persist getting ${strKeyList} version: ${version} maxAgeInHrs: ${maxAgeInHrs} `);

    let values;
    const keyValList = {};
    const keysToRemove = [];
    let allKeysList = [];

    try {
      if ((strKeyList) && (strKeyList.length > 0)) {
        allKeysList = [...strKeyList];
      }

      values = await AsyncStorage.multiGet(allKeysList);
      if (values.length === 0) {
        return keyValList;
      }

      for (let i = 0; i < values.length; i++) {
        const keyValArr = values[i];

        /* If the key is not present then the length will be 2,
        but value part is null */
        if ((keyValArr.length === 2) && (keyValArr[1])) {
          try {
            const jsonValue = JSON.parse(keyValArr[1]);
            const curAgeInHrs = (Date.now() - jsonValue.ts) / 1000 / 60 / 60;
            if ((version !== jsonValue.version) || ((curAgeInHrs > maxAgeInHrs) && (maxAgeInHrs !== 0))) {
              keysToRemove.push(keyValArr[0]);
            } else {
              keyValList[keyValArr[0]] = jsonValue.data;
            }
          } catch (e) {
            console.log('getMultiValues, parsing JSON failed for key : ', keyValArr[0]);
            keysToRemove.push(keyValArr[0]);
          }
        }
      }

      if (keysToRemove.length > 0) {
        console.log('getMultiValues removing keys: ', keysToRemove);
        try {
          await AsyncStorage.multiRemove(keysToRemove);
        } catch (e) {
          console.log('getMultiValues, remove keys failed, error: ', e);
        }
      }

      return keyValList;
    } catch (e) {
      console.log('getMultiValues failed, error: ', e);
      return keyValList;
    }
  },

  removeKey: async (strKey) => {
    console.log(`Persist removing ${strKey} `);
    try {
      await AsyncStorage.removeItem(strKey);
    } catch (e) {
      console.log('Failed to remove persisted data for key: ', strKey, ' error: ', e);
    }
  },

  removeAllKeysWithPrefix: async (prefix) => {
    console.log(`Persist removing ${prefix} `);

    let keys = [];

    try {
      keys = await AsyncStorage.getAllKeys();

      for (let i = 0; i < keys.length; i++) {
        const currentKey = keys[i];
        if (currentKey.startsWith(prefix)) {
          try {
            await AsyncStorage.removeItem(currentKey);
          } catch (err) {
            console.log('Failed to remove persisted data for key: ', currentKey, ' error: ', err);
          }
        }
      }
    } catch (e) {
      console.log('Failed to remove persisted data for prefix: ', prefix, ' error: ', e);
    }
  },

  getAllKeysWithPreix: async (prefix) => {
    let keys = [];
    let keysWithPrefix = [];
    try {
      keys = await AsyncStorage.getAllKeys();

      if (keys.length > 0) {
        keysWithPrefix = keys.filter(key => key.startsWith(prefix));
      }

      return keysWithPrefix;
    } catch (e) {
      console.log('Failed to get all keys with prefix,', prefix, '  error: ', e);
      return keysWithPrefix;
    }
  },
};