// Elimina de una cadena los caracteres que no sean letras o numeros
export const removerCaracteres = (string) => {
  return string
    .normalize("NFD")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .replace(/ /g, "");
};

// Devuelve solo las letras de un string
export const getOnlyLetters = (string) => {
  return string
    .normalize("NFD")
    .replace(/[^a-zA-Z ]/g, "")
    .replace(/ /g, "");
};

// Devuelve solo los numeros de un string
export const getOnlyNumbers = (string) => {
  return string
    .normalize("NFD")
    .replace(/[^0-9 ]/g, "")
    .replace(/ /g, "");
};

export const deleteSpaces = (text) => {
  return text.replace(/\s/g, "");
};

export const getOnlyLettersAndNumbers = (text) => {
  return text.replace(/[^A-Za-z0-9]+/g, "");
};
