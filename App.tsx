
import Navigator from './src/navigation/Navigator'
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import Home from './src/pages/Home'
import { AppProvider } from './src/context/AppProvider'
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppProvider>
      <Navigator />
    </AppProvider>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
