import React, { useState } from 'react';

import styles from './styles.module.scss';

export default function Signin() {
  const [focused, setFocus] = useState('');

  return (
    <div className={styles.Signin}>
      <form className={styles.Signin__form}>
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
          <button className={styles.Signin__form__button} type="submit">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
