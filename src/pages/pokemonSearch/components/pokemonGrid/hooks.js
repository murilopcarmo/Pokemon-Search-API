import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a debounce timer
    const handler = setTimeout(() => {
      // Update debounced value after the delay
      setDebouncedValue(value); // Update debounced value after the delay
    }, delay);

    return () => {
      // Cleanup function to clear the timeout if value or delay changes
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue; // Return the debounced value
};
