import Reactotron from 'reactotron-react-native';

if (__DEV__) { // Just execute when you are in development mode
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
