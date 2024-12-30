/* ---------------------- ID TO KEY --------------------- */
interface IdToKeyData {
  id: number,
  [key: string]: any
}

export const idToKey = (data: IdToKeyData[]) => {
  return data.map((item: IdToKeyData) => {
    const {id: key, ...rest} = item
    delete rest.id
    return ({key, ...rest})
  })
}

/* ---------------------- KEY TO ID --------------------- */
interface KeyToIdData {
  key: number,
  [key: string]: any
}

export const keyToId = (data: KeyToIdData[]) => {
  return data.map((item: KeyToIdData) => {
    const {key: id, ...rest} = item
    delete rest.key
    return ({id, ...rest})
  })
}

/* ------------- TABLE ROW NUMBER GENERATOR ------------- */
export const tableRowNumberGenerator = (text: any, record: any, index: number): number => index + 1