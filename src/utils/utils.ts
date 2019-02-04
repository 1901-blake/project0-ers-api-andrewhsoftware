export function updateWith<Q>(initialObject: Q, updatedObject: Q): Q {
    let result: Q = initialObject;
    for (const key in Object.keys(updatedObject)) {
        if (typeof(key) != 'undefined') {
            result[key] = updatedObject[key];                
        }
    }
    return result;
}