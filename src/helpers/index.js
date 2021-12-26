const getPayloadWithValidFieldsOnly = (validFields, payload) =>
  Object.entries(payload).reduce(
    (acc, [key, value]) =>
      validFields.includes(key) ? { ...acc, [key]: value } : acc,
    {}
  );

module.exports = {
  getPayloadWithValidFieldsOnly,
};
