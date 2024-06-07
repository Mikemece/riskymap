import { Slot } from 'expo-router'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from '../tamagui.config'
import { useEffect } from 'react'
import { UserProvider } from '~/components/UserContext'
const RootLayout = () => {

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded])

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <TamaguiProvider config={tamaguiConfig}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Slot />
        </GestureHandlerRootView>
      </TamaguiProvider>
    </UserProvider>
  )
}
export default RootLayout