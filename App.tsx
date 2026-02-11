
import Navigator from './src/navigation/Navigator'
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import Home from './src/pages/Home'
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
  <Navigator/>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
