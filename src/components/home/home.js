import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import * as Progress from 'react-native-progress';
import Budget from './budget';

const Home = () => (
  <ScrollView>
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 10,
        }}>
        <Text>Account Balance</Text>
        <Text style={{fontSize: 25, paddingBottom: 10, fontWeight: 'bold'}}>
          Rs. 35000
        </Text>
      </View>
      <Budget />
      <View style={{paddingTop: 15}}>
        <Text
          style={{
            paddingBottom: 15,
            alignItems: 'center',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Expenditure
        </Text>
        <View style={{paddingBottom: 10}}>
          <Text>Electricity Bill</Text>
          <View style={{flexDirection: 'row'}}>
            <Progress.Bar
              progress={0.3}
              width={280}
              height={17}
              color={'#EA7A7A'}
            />
            <Text style={{paddingLeft: 10}}>Rs. 5000</Text>
          </View>
        </View>

        <View style={{paddingBottom: 10}}>
          <Text>Water Bill</Text>
          <View style={{flexDirection: 'row'}}>
            <Progress.Bar
              progress={0.3}
              width={280}
              height={17}
              color={'#A4E6E8'}
            />
            <Text style={{paddingLeft: 10}}>Rs. 5000</Text>
          </View>
        </View>
        <View style={{paddingBottom: 10}}>
          <Text>Internet Bill</Text>
          <View style={{flexDirection: 'row'}}>
            <Progress.Bar
              progress={0.3}
              width={280}
              height={17}
              color={'#B399EA'}
            />
            <Text style={{paddingLeft: 10}}>Rs. 5000</Text>
          </View>
        </View>
        <View style={{paddingBottom: 10}}>
          <Text>Food and Drink</Text>
          <View style={{flexDirection: 'row'}}>
            <Progress.Bar
              progress={0.3}
              width={280}
              height={17}
              color={'#EFC667'}
            />
            <Text style={{paddingLeft: 10}}>Rs. 5000</Text>
          </View>
        </View>
        <View style={{paddingBottom: 50}}>
          <Text>Others</Text>
          <View style={{flexDirection: 'row'}}>
            <Progress.Bar
              progress={0.3}
              width={280}
              height={17}
              color={'#89E2AF'}
            />
            <Text style={{paddingLeft: 10}}>Rs. 5000</Text>
          </View>
        </View>
      </View>
    </View>
  </ScrollView>
);

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9E9',
    alignItems: 'center',
    paddingTop: 12,
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  },
});
