export const getCurrentURL = () => window.location.href;

export const createMatchPayload = (payload) => ({
  ...payload
})

export const hasParam = (key) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.has(key)
}

export const getURLParam = (key) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(key)
}