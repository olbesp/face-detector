function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  return password && password.trim().length >= 8;
}

function validateImgUrl(url) {
  return url.startsWith('http');
}

function validateName(name) {
  return name && name.trim().length > 0;
}

export default {
  email: validateEmail,
  password: validatePassword,
  imgUrl: validateImgUrl,
  name: validateName,
  errors: {
    name: 'Name is not valid',
    email: 'Not valid email',
    password: 'Password should contain 8 or more characters',
    imgUrl: "The app supports only 'http' or 'https' based urls"
  }
};
