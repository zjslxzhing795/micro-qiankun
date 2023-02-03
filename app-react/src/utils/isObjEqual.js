export const isObjEqual = (current, prev) => {
  const currentKeys = Object.keys(current);
  const prevKeys = Object.keys(prev);
  if (currentKeys.length === prevKeys.length) {
    for (const key of currentKeys) {
      if (current[key] !== prev[key]) {
        return false;
      }
    }
    return true;
  }
  return false;
};
