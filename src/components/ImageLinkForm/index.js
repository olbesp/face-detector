import React from 'react';

import styles from './styles.module.scss';

export default function ImageLinkForm({ value, onChange, onSubmit }) {
  const isDisabled = !value || value.trim().length === 0;
  return (
    <div className={styles.ImageLinkForm}>
      <p className={styles.ImageLinkForm__description}>
        This app will detect faces in your pictures.
      </p>
      <div className={styles.ImageLinkForm__form}>
        <div className={styles.ImageLinkForm__form_inner}>
          <input
            onChange={onChange}
            value={value}
            type="text"
            className={styles.ImageLinkForm__form__input}
          />
          <button
            className={[
              styles.ImageLinkForm__form__button,
              isDisabled ? styles.ImageLinkForm__form__button_disabled : null
            ].join(' ')}
            type="submit"
            onClick={isDisabled ? () => {} : onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}
