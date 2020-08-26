import queryString from "query-string";

export const getFlights = async (queryObject) => {
  const query = queryString.stringify(queryObject, { skipNull: true, skipEmptyString: true });
  const url = `http://business-issue1608.test.travelwits.com/getflights?${query}`;

  const pollUrl = `http://business-issue1608.test.travelwits.com/pollflights?${query}`;
  await fetch(pollUrl);

  const response = await fetch(url);
  return await response.json();
};
