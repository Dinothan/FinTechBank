import React, {Component} from 'react';
import {View, AsyncStorage, Text} from 'react-native';
import {connect} from 'react-redux';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import * as actions from '../store/actions/index';
import ReactNativeBiometrics from 'react-native-biometrics';
import * as Keychain from 'react-native-keychain';

class login extends Component {
  state = {
    email: '',
    password: '',
    error: null,
  };
  componentDidMount = () => {
    this.checkDeviceBiometricState();
    // this.hasCredentialsInKeychain();
  };

  checkDeviceBiometricState = () => {
    ReactNativeBiometrics.isSensorAvailable()
      .then(supported => {
        const {available = false, error = '', biometryType = ''} = supported;

        if (available && biometryType) {
          let supportedBiometryType = '';
          switch (biometryType) {
            case 'TouchID':
              supportedBiometryType = 'Touch ID';
              break;
            case 'FaceID':
              supportedBiometryType = 'Face ID';
              break;
            default:
              supportedBiometryType = 'Biometrics';
              break;
          }
          console.log('supportedBiometryType: ', supportedBiometryType);
          this.setState({
            touchIDIsSupported: true,
            openSetting: false,
            biometricType: supportedBiometryType,
            showSetting: false,
          });
        } else {
          console.log('supportedBiometryType: no ');
          if (
            error === 'BIOMETRIC_ERROR_NONE_ENROLLED' ||
            error.includes('No identities are enrolled.')
          ) {
            this.setState({
              touchIDIsSupported: false,
              openSetting: true,
            });
          } else {
            // Biometry hardware not present
            this.setState({
              touchIDIsSupported: false,
              openSetting: false,
            });
          }
        }
      })
      .catch(error => {
        this.setState({
          touchIDIsSupported: false,
          openSetting: false,
        });
      });
  };
  handleOnSubmitLoginTuchId = () => {
    const {touchIDIsSupported, openSetting} = this.state;

    if (!touchIDIsSupported && openSetting) {
      this.setState({nextTimeBioMetric: false}, () =>
        this.setState({showSetting: true}),
      );
    } else {
      this.setState({
        emailValidate: true,
        passwordValidate: true,
        error: false,
        errorDescription: null,
      });

      ReactNativeBiometrics.simplePrompt({
        promptMessage: 'Confirm ' + this.state.biometricType,
        cancelButtonText: 'Cancel',
      })
        .then(async resultObject => {
          const {success} = resultObject;

          if (success) {
            // const credentials = await Keychain.getGenericPassword({
            //   authenticationPrompt: {
            //     title: 'Fingerprint title',
            //     cancel: 'Cancel',
            //   },
            //   service: 'LOGIN_SERVICES',
            // });
            // const username = credentials.username;
            // const password = credentials.password;
            // await Keychain.resetGenericPassword({
            //   service: 'LOGIN_SERVICES',
            // });
            // if (success && username && password) {
            //   this.setState({loginWithTouchIdWait: true}, () => {
            //     this.onLogin(username, password, validationData, false);
            //   });
            // } else if (success && this.state.email && this.state.password) {
            //   this.setState(
            //     {loginWithTouchIdWait: true, nextTimeBioMetric: false},
            //     () => {
            //       this.onLogin(
            //         this.state.email,
            //         this.state.password,
            //         validationData,
            //         false,
            //       );
            //     },
            //   );
            // } else {
            //   // this.setState({ hasCredentials: false });
            //   // this.props.setLoginWithTouchId(false);
            // }
          } else {
          }
        })
        .catch(error => {
          // this.setState({ hasCredentials: false });
          // this.props.setLoginWithTouchId(false);
        });
    }
  };

  render() {
    const {email, password} = this.state;
    return (
      <View style={{justifyContent: 'center'}}>
        <Text
          style={{
            padding: 15,
            fontSize: 25,
            marginLeft: 100,
            color: 'black',
          }}>
          FinTech Bank
        </Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => {
            this.setState({email: text});
          }}
        />
        <View style={{marginBottom: 15}} />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => {
            this.setState({password: text});
          }}
        />
        <View style={{marginBottom: 15}} />
        <Button
          icon="login"
          mode="contained"
          style={{backgroundColor: 'blue', alignItems: 'center'}}
          onPress={async () => {
            if (this.state.email && this.state.password) {
              auth()
                .signInWithEmailAndPassword(
                  this.state.email,
                  this.state.password,
                )
                .then(async res => {
                  console.log(
                    'User account created & signed in!',
                    res.user.email,
                  );

                  await AsyncStorage.setItem('@storage_Key', res.user.email);

                  this.props.auth(res.user.email);

                  this.props.history.push('/home');
                })
                .catch(error => {
                  if (error.code === 'auth/email-already-in-use') {
                    this.setState({
                      error: 'That email address is already in use!',
                    });
                  }

                  if (error.code === 'auth/invalid-email') {
                    this.setState({error: 'That email address is invalid!'});
                  }

                  console.error(error);
                });
            } else {
              this.setState({error: 'Please enter email and password'});
            }
          }}>
          Login
        </Button>
        {this.state.touchIDIsSupported && (
          <View
            style={{
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                padding: 15,
              }}>
              OR
            </Text>
            <Button
              mode="contained"
              style={{backgroundColor: 'blue'}}
              onPress={this.handleOnSubmitLoginTuchId}>
              Login with Biometric
            </Button>
          </View>
        )}
        {this.state.error && (
          <Text style={{color: 'red'}}>{this.state.error}</Text>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    auth: res => dispatch(actions.auth(res)),
  };
};
export default connect(null, mapDispatchToProps)(login);
