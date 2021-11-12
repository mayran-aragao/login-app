import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableHighlight,
  ScrollView,
  Animated
} from 'react-native';


const App = () => {

  const [isLogged, setIsLogged] = useState(false)
  const [showError, setShowError] = useState(false)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const fadeLogout = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeLogout, {
      toValue: isLogged ? 1 : 0,
      duration: 1200,
      useNativeDriver: true
    }).start()
  }, [isLogged])

  const handleLogin = () => {
    if (username == 'oowlish' && password == '123') {
      setIsLogged(true)
      setUserName('')
      setPassword('')
    }
    else
      setShowError(true)
  }
  const handleLogout = async () => {
    setIsLogged(false)
    setShowError(false)
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }} scrollEnabled={false} keyboardDismissMode='on-drag' keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.Container} >
        {!isLogged &&
          <>
            <View style={styles.Header} >
              <View style={styles.ContainerImage}>
                <Image resizeMode="center" source={require('./src/assets/oowlish.png')} />
              </View>
            </View>
            {showError &&
              <View >
                <Text style={styles.Error}>Wrong username or password</Text>
              </View>
            }
            <View style={styles.Body} >
              <TextInput
                style={styles.Input}
                autoCapitalize="none"
                placeholder="Username"
                value={username}
                onChangeText={(t) => setUserName(t)}
              />
              <TextInput
                style={styles.Input}
                placeholder="Password"
                value={password}
                onChangeText={(t) => setPassword(t)}
                secureTextEntry={true}
              />
            </View>
            <TouchableHighlight
              style={styles.Button}
              activeOpacity={0.5}
              underlayColor="#e67400"
              onPress={() => handleLogin()}
            >
              <View >
                <Text style={styles.Text}>Login</Text>
              </View>
            </TouchableHighlight>
          </>
        }
        {isLogged &&
          <>
            <Animated.View style={{ opacity: fadeLogout }}>
              <Text style={styles.Text}>You're logged in</Text>
            </Animated.View>
            <Animated.View style={[styles.Button, { opacity: fadeLogout }]}>
              <TouchableHighlight
                style={styles.Touch}
                activeOpacity={0.6}
                underlayColor="#e67400"
                onPress={() => handleLogout()}
              >
                <View>
                  <Text style={styles.Text}>Logout</Text>
                </View>
              </TouchableHighlight>
            </Animated.View>
          </>
        }
      </SafeAreaView>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  Header: {
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 50,
  },
  ContainerImage: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Body: {
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Input: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    padding: 10,
    margin: 5,
    borderWidth: 0.4,
  },
  Button: {
    width: '85%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ff9120",
    borderRadius: 5,
    top: 25
  },
  Touch: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    fontSize: 18,
    color: '#000',
  },
  Error: {
    fontSize: 14,
    color: '#ff0000',
    bottom: 5
  }

});

export default App;
