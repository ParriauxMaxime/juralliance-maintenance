export const unnormalize = normalizedData => (
  Object
    .keys(normalizedData)
    .map(e => normalizedData[e])
    .filter(e => e)
);
