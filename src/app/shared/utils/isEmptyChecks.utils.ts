/**
 * Checks if the object is undefined or null
 * @param {T} propertyToCheck any object type
 * @returns {boolean} true if the property is undefined or null
 */
export const isPropertyNull = <T>(propertyToCheck: T): boolean => {
    return (
        propertyToCheck === undefined
        || propertyToCheck === null
    );
}

/**
 * Checks if string is empty or null
 * @param stringToCheck
 * @returns {boolean} true if string is empty or is null
 */
export const isStringNullOrEmpty = (stringToCheck: string): boolean => {
    return (
        isPropertyNull(stringToCheck)
        || stringToCheck.trim() === ''
    );
}
