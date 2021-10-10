import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
const screenWidth = Dimensions.get('window').width;

const data = [
  {
    name: 'Electricity Bill',
    population: 5000,
    color: '#EA7A7A',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Water Bill',
    population: 1000,
    color: '#A4E6E8',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Internet Bill',
    population: 2000,
    color: '#B399EA',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Food and Drink',
    population: 3000,
    color: '#EFC667',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Others',
    population: 1500,
    color: '#89E2AF',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const budget = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#E9E9E9',
        alignItems: 'center',
        paddingTop: 10,
      }}>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>Budget</Text>
      <PieChart
        data={data}
        width={screenWidth}
        height={250}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        center={[10, 20]}
        absolute
      />
    </View>
  );
};
export default budget;
