import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {Surface, TextInput, Button} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import QRScan from './qrScan';
const data = [
  {
    label: 'Internet Bills',
    value: 1,
  },
  {
    label: 'Home Bills',
    value: 2,
  },
  {
    label: 'Food and Drink',
    value: 3,
  },
  {
    label: 'Furniture',
    value: 4,
  },
  {
    label: 'Grocery',
    value: 5,
  },
  {
    label: 'Insurance',
    value: 6,
  },
];

const select1 = [
  {
    label: 'Dialog',
    value: 1,
  },
  {
    label: 'SLT/Mobitel',
    value: 2,
  },
  {
    label: 'Hutch',
    value: 3,
  },
  {
    label: 'Airtel',
    value: 4,
  },
];

const select2 = [
  {
    label: 'Electricity Bill',
    value: 1,
  },
  {
    label: 'Water Bill',
    value: 2,
  },
];

const select3 = [
  {
    label: 'Uber Eats',
    value: 1,
  },
  {
    label: 'Pickme',
    value: 2,
  },
];

const select4 = [
  {
    label: 'Dambro',
    value: 1,
  },
  {
    label: 'Singer Furniture',
    value: 2,
  },
  {
    label: 'Arpico Furniture',
    value: 3,
  },
];

const select5 = [
  {
    label: 'Foodcity',
    value: 1,
  },
  {
    label: 'Keells Super',
    value: 2,
  },
];

const select6 = [
  {
    label: 'Ceylinco',
    value: 1,
  },
  {
    label: 'Srilanka Insurance',
    value: 2,
  },
];

const Payment = () => {
  const [selectedValue, setSelectedValue] = useState(1);
  const [flag, setFlag] = useState(true);
  const [selectedValue1, setSelectedValue1] = useState(1);
  const [text, setText] = React.useState(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);

  // const [flag, setFlag] = useState(false);
  return (
    <View style={styles.header}>
      {flag ? (
        <Text style={{fontSize: 20, paddingTop: 15}}>Pay Your Bills</Text>
      ) : (
        <Text style={{fontSize: 20, paddingTop: 15}}>Scan and Pay</Text>
      )}
      {flag ? (
        <Surface style={styles.containerStyle}>
          <SafeAreaView style={styles.safeContainerStyle}>
            <DropDown
              label={'Select Category'}
              mode={'outlined'}
              style={{height: 50, width: 200}}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={selectedValue}
              setValue={setSelectedValue}
              list={data}
            />
            <View style={styles.spacerStyle} />
            <DropDown
              label={'Select Service Center'}
              mode={'outlined'}
              style={{height: 50, width: 200, paddingTop: 15}}
              visible={showMultiSelectDropDown}
              showDropDown={() => setShowMultiSelectDropDown(true)}
              onDismiss={() => setShowMultiSelectDropDown(false)}
              value={selectedValue1}
              setValue={setSelectedValue1}
              list={
                selectedValue === 1
                  ? select1
                  : selectedValue === 2
                  ? select2
                  : selectedValue === 3
                  ? select3
                  : selectedValue === 4
                  ? select4
                  : selectedValue === 5
                  ? select5
                  : select6
              }
            />
            <View style={styles.spacerStyle} />
            <TextInput
              mode="outlined"
              label="Amount"
              placeholder="Type Amount"
              value={text}
              onChangeText={setText}
            />
            <View style={styles.spacerStyle} />
            <Button mode="contained" onPress={() => console.log('Pressed')}>
              Pay
            </Button>
            <View style={styles.spacerStyle} />
            <Text
              style={{
                fontSize: 16,
                paddingTop: 15,
                paddingLeft: 120,
                paddingBottom: 15,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              OR
            </Text>
            <Button mode="contained" onPress={() => setFlag(false)}>
              Scan and Pay
            </Button>
          </SafeAreaView>
        </Surface>
      ) : (
        <QRScan />
      )}
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#E9E9E9',
  },
  containerStyle: {
    flex: 1,
    backgroundColor: '#E9E9E9',
    height: 50,
    width: 320,
  },
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
    // justifyContent: 'center',
  },
  centerText: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 18,
    justifyContent: 'center',
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
