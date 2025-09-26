import React from 'react'
import { SafeAreaProvider} from 'react-native-safe-area-context'
import AppLayout from './src/navigation/AppLayout'
import { StatusBar } from 'react-native'
// import Test from './src/screens/Teacher/test/test1'

const App = () => {
  return (
    <SafeAreaProvider>
      {/* Set the status bar style and background color */}
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      <AppLayout/>
    </SafeAreaProvider>
  )
}

export default App
