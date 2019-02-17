import React from 'react';
import styles from './styles.module.scss';

export default function Navigation({
  onRouteChange,
  isAuthenticated,
  onAuthenticate,
  clearSession
}) {
  const logout = () => {
    clearSession();
    onAuthenticate(false);
    onRouteChange('signin');
    localStorage.removeItem('user');
  };

  return (
    <nav className={styles.Navigation}>
      {isAuthenticated && (
        <p onClick={logout} className={styles.Navigation__link}>
          Sign Out
        </p>
      )}
    </nav>
  );
}
