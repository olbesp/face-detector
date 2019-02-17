import React, { useState, useEffect, Fragment } from 'react';

import Background from 'components/Background';
import Navigation from 'components/Navigation';
import Logo from 'components/Logo';
import Alert from 'components/Alert';
import ImageLinkForm from 'components/ImageLinkForm';
import FaceRecognition from 'components/FaceRecognition';
import Rank from 'components/Rank';
import Signin from 'components/Signin';
import api from 'api';
import validate from 'utils/inputValidation';
import styles from './App.module.scss';

export default function App() {
  const [input, setInput] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [frames, setFrames] = useState([]);
  const [route, setRoute] = useState('signin');
  const [user, setUser] = useState({});
  const [isAuthenticated, setAuth] = useState(false);
  const [errorContent, setErrorContent] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      setAuth(true);
      setRoute('home');
    }
  }, []);

  const clearSession = () => {
    setFrames([]);
    setUser({});
    setInput('');
    setImgUrl('');
  };

  const isUrlValid = () => {
    const isValid = validate.imgUrl(input);
    if (!isValid) {
      setErrorContent(validate.errors.imgUrl);
    }
    return isValid;
  };

  const putImageEntry = () => {
    fetch(api.updateEntries, {
      method: 'PUT',
      body: JSON.stringify({ id: user.id }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(responseJson => responseJson.json())
      .then(response => {
        if (response) {
          setUser({
            ...user,
            entries: response
          });
        }
      })
      .catch(error => {
        setErrorContent(error);
      });
  };

  const onSubmit = () => {
    const isValid = isUrlValid();
    if (!isValid) return;
    setImgUrl(input);
    setFrames([]);
    fetch(api.imageUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          putImageEntry();
        }
        const { regions } = response.outputs[0].data;
        const boundingBoxes = regions.map(
          region => region.region_info.bounding_box
        );
        setFrames(boundingBoxes);
      })
      .catch(error => {
        setErrorContent(error);
      });
  };

  return (
    <div className={styles.App}>
      <Alert content={errorContent} disableAlert={() => setErrorContent('')} />
      <Background isGlobal />
      <Navigation
        onRouteChange={setRoute}
        isAuthenticated={isAuthenticated}
        onAuthenticate={setAuth}
        clearSession={clearSession}
      />
      <Logo />
      {route === 'signin' ? (
        <Signin
          onRouteChange={setRoute}
          onAuthenticate={setAuth}
          setUser={setUser}
        />
      ) : (
        <Fragment>
          <div className={styles.App__content}>
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm
              onChange={e => setInput(e.target.value)}
              value={input}
              onSubmit={onSubmit}
            />
          </div>
          <FaceRecognition src={imgUrl} frames={frames} />
        </Fragment>
      )}
    </div>
  );
}
