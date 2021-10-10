import React, {Fragment} from 'react';
import {AsyncStorage, StyleSheet, View, Text} from 'react-native';
import {withRouter, Route} from 'react-router-native';
import {BottomNavigation, Appbar} from 'react-native-paper';
import {connect} from 'react-redux';
import Home from '../screens/home/home';
import Payment from '../screens/payment/payment';
import Profile from '../screens/profile/profile';
import Login from '../components/login';
import * as actions from '../store/actions/index';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconEn from 'react-native-vector-icons/Entypo';
import AddMoney from '../screens/addMoney/addMoney';
import {NetworkConsumer} from 'react-native-offline';

const Router = props => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'home', title: 'Home', icon: 'home'},
    {
      key: 'payment',
      title: 'Payment',
      icon: ({size, color}) => <Icon name="payment" size={size} />,
    },
    {
      key: 'addMoney',
      title: 'AddMoney',
      icon: ({size, color}) => <IconEn name="credit" size={size} />,
    },
    {
      key: 'profile',
      title: 'Profile',
      icon: ({size, color}) => <IconEn name="user" size={size} />,
    },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    payment: Payment,
    addMoney: AddMoney,
    profile: Profile,
  });
  const title = index
    ? index === 0
      ? 'Home'
      : index === 1
      ? 'Payment'
      : index === 2
      ? 'AddMoney'
      : 'Profile'
    : 'Home';
  const _goBack = () => console.log('Went back');
  console.log('router: ', props.isAuthenticated);
  return (
    <Fragment>
      {!props.isAuthenticated ? (
        <View style={styles.container}>
          <NetworkConsumer>
            {({isConnected}) =>
              !isConnected && (
                <View>
                  <Text>No Internet</Text>
                </View>
              )
            }
          </NetworkConsumer>
          <Login history={props.history} />
          <Route exact path="/login" component={Login} />
        </View>
      ) : (
        <Fragment>
          <NetworkConsumer>
            {({isConnected}) =>
              !isConnected && (
                <View>
                  <Text>No Internet</Text>
                </View>
              )
            }
          </NetworkConsumer>
          <Appbar.Header style={{backgroundColor: '#ffff'}}>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content title={title} />
            <Appbar.Action
              icon="logout"
              onPress={() => {
                AsyncStorage.removeItem();
                props.auth(null);
              }}
            />
          </Appbar.Header>
          <BottomNavigation
            navigationState={{index, routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
            barStyle={{backgroundColor: '#ffff'}}
          />
        </Fragment>
      )}
    </Fragment>
  );
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    auth: res => dispatch(actions.auth(res)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Router));

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
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
