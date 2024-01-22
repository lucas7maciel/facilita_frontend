
export const checkFields = (name, email, phone, x, y) => {
  let success = false;
  let message = "Pode passar";

  if (!name || !email || !phone || !x || !y) {
    message = "Campo vazio";
  } else if (name.length > 40) {
    message = "Nome não pode ter mais de 40 caracteres";
  } else if (email.length > 254) {
    message = "Email não pode ter mais de 254 caracteres";
  } else if (phone.length > 15) {
    message = "Telefone não pode ter mais de 15 digitos";
  } else {
    success = true;
  }

  return { success, message };
};
