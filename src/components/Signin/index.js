import React, { useState } from 'react';

import Alert from 'components/Alert';
import api from 'api';
import validate from 'utils/inputValidation';
import styles from './styles.module.scss';

export default function Signin({ setUser, onRouteChange, onAuthenticate }) {
  const [focused, setFocus] = useState('');
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorContent, setErrorContent] = useState('');

  const storeUserData = userData => {
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const isInputValid = () => {
    let isNameValid = true;
    const isEmailValid = validate.email(email);
    const isPasswordValid = validate.password(password);
    if (mode === 'register') {
      isNameValid = validate.name(name);
    }

    if (!isEmailValid) {
      setErrorContent(validate.errors.email);
    } else if (!isPasswordValid) {
      setErrorContent(validate.errors.password);
    } else if (!isNameValid) {
      setErrorContent(validate.errors.name);
    }

    return isNameValid && isEmailValid && isPasswordValid;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isValid = isInputValid();
    if (!isValid) return;
    const data = {
      email,
      password
    };
    if (mode === 'register') {
      data.name = name;
    }

    fetch(api[mode], {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(responseJson => responseJson.json())
      .then(response => {
        if (response && response.id) {
          storeUserData(response);
          setUser(response);
          onRouteChange('home');
          onAuthenticate(true);
        } else {
          setErrorContent(response);
        }
      })
      .catch(error => {
        setErrorContent(error);
      });
  };

  return (
    <div className={styles.Signin}>
      <Alert content={errorContent} disableAlert={() => setErrorContent('')} />
      <form className={styles.Signin__form}>
        {mode === 'register' && (
          <div className={styles.Signin__form__inputContainer}>
            <input
              onFocus={() => setFocus('name')}
              onBlur={() => setFocus('')}
              type="text"
              name="name"
              className={[
                styles.Signin__form__inputContainer__input,
                focused === 'name'
                  ? styles.Signin__form__inputContainer__input_focused
                  : null
              ].join(' ')}
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        )}
        <div className={styles.Signin__form__inputContainer}>
          <input
            onFocus={() => setFocus('email')}
            onBlur={() => setFocus('')}
            type="email"
            name="email"
            className={[
              styles.Signin__form__inputContainer__input,
              focused === 'email'
                ? styles.Signin__form__inputContainer__input_focused
                : null
            ].join(' ')}
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.Signin__form__inputContainer}>
          <input
            onFocus={() => setFocus('password')}
            onBlur={() => setFocus('')}
            type="password"
            name="password"
            className={[
              styles.Signin__form__inputContainer__input,
              focused === 'password'
                ? styles.Signin__form__inputContainer__input_focused
                : null
            ].join(' ')}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.Signin__form__inputContainer}>
          <button
            onClick={handleSubmit}
            className={styles.Signin__form__button}
            type="submit"
          >
            {mode === 'signin' ? 'Sign in' : 'Register'}
          </button>
        </div>
        <div className={styles.Signin__form__inputContainer}>
          <button
            onClick={() => setMode(mode === 'signin' ? 'register' : 'signin')}
            className={[
              styles.Signin__form__button,
              styles.Signin__form__button_transparent
            ].join(' ')}
            type="button"
          >
            {mode === 'signin' ? 'Register' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
}
