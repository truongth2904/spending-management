import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import AppContainer from './navigator';
import {APIUtils} from './utils';

export const EmailContext = React.createContext({
  value: '',
  setValue: () => {},
});

const Root = props => {
  const [email, setEmail] = useState('');
  const [resData, setResData] = useState();

  const getAccessToken = async () => {
    const res = await AsyncStorage.getItem('ACCESS_TOKEN');
    setResData(res);
    //  APIUtils.setAccessToken(res);
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <EmailContext.Provider value={{value: email, setValue: setEmail}}>
      <AppContainer />
    </EmailContext.Provider>
  );
};

export default Root;
