import { useState } from "react";

// Generic Key and Initial value to be Array or function that returns an T type
export function uselocalStorage<T>(key: string, initialValue: [] | (() => T)) {
  const [Value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    // this checks if value is null then fetch it from function or array
    // else return localstorage value
    if (jsonValue === null) {
      if (typeof initialValue === "function") {
        return initialValue as () => [];
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });

  return [Value, setValue];
}
