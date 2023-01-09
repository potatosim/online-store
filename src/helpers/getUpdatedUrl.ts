import { FiltersQueryNames } from 'enums/FiltersQueryNames';

const getUpdatedUrl = (newQuery: string) => {
  const q = new URLSearchParams(location.search);
  q.set(FiltersQueryNames.View, newQuery);
  const newurl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    '?' +
    q.toString();
  window.history.pushState({ path: newurl }, '', newurl);
};

export default getUpdatedUrl;
