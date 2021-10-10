import React, {useState} from 'react';
import {CreditCardInput} from 'react-native-payment-card';

const addMoney = () => {
  const _onChange = value => {
    console.log('pay: ', value);
  };
  return (
    <CreditCardInput
      autoFocus
      requiresName
      requiresCVC
      // labelStyle={}
      // inputStyle={}
      validColor={'black'}
      invalidColor={'red'}
      placeholderColor={'darkgray'}
      onChange={_onChange}
    />
  );
};

export default addMoney;
