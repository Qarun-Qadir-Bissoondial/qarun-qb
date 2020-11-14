export const stripFields = (fields: string[]) => (obj: object) => {
    const newObj = Object.assign({}, obj)
    for (const field of fields) {
      delete newObj[field]
    }
  
    return newObj
  }
  
export const stripDbFields = stripFields(['createdAt', 'updatedAt']);