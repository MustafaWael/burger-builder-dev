export const updateState = (oldObj, updatedProperties) => {
  return {
    ...oldObj,
    ...updatedProperties
  }
}
