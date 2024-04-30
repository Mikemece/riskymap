import { View, Text } from 'react-native'
import { Button, Input, SizeTokens, XStack, YStack } from 'tamagui'

const Login = () => {
  return (
    <YStack width={1200} alignSelf='center'>
      <InputDemo size="$5"/>
      <InputDemo size="$5"/>
      <InputDemo size="$5"/>
      <InputDemo size="$5"/>
      <Button onPress={() => console.log('GOGOGO')}>Dale mi loco</Button>
    </YStack>
  )
}

export default Login

function InputDemo(props: { size: SizeTokens }) {
  return (
    <XStack alignContent='center' gap='$1' margin='$5'>
      <Input flex={1} size={props.size} placeholder={'Introduce tu email...'}/>
    </XStack>
  )
}