import React, { useState } from 'react';

import styles from './styles.module.scss';

export default function Signin({ onRouteChange, onAuthenticate }) {
  const [focused, setFocus] = useState('');
  const [mode, setMode] = useState('signin');

  const handleSubmit = () => {
    onRouteChange('home');
    onAuthenticate(true);
  };

  return (
    <div className={styles.Signin}>
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
            // value={''}
            // onChange={on}
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
            // value={''}
            // onChange={on}
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
