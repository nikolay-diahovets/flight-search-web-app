export const getCarrierFilters = (carriers = []) => {
  return carriers.map(({ name }) => {
    return { name: `${name}-carrier`, label: `${name}`, value: name, checked: false };
  });
}
