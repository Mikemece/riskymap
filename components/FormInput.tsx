import { Input, SizeTokens, XStack } from "tamagui"
import { theme } from "./theme"

export const FormInput = (props: { size: SizeTokens, placeholder: string, value: string, onChangeText: (value: string) => void, secureTextEntry?: boolean }) => {
    return (
      <XStack margin={15}>
        <Input flex={1}
          size={props.size}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureTextEntry}
          backgroundColor= {theme.colors.white}
          borderColor={theme.colors.black}
          color= {theme.colors.black} 
          />
      </XStack>
    )
  }