export const timeFormat = (number) => number > 9 ? `${number}` : `0${number}`

export const moneyFormat = (number) => `$ ${Math.round(number).toLocaleString("es-CL")}`
