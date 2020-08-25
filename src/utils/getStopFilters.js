export const getStopFilters = (availableStopFilters = []) => {
  return availableStopFilters.map((item) => {
    return { name: `${item}-stop`, label: `${item}`, value: item, checked: false };
  });
};
