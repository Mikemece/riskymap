import { Button, Dialog, Text } from "tamagui"
import theme from "../theme"

export const EditImageButton = (props: any) => {

    // const [open, setOpen] = useState(false);
    // const [newUsername, setNewUsername] = useState('');

    return (
        <Button
        width={150}
        height={70}
        marginBottom={10}
        marginTop={5}
        marginHorizontal={10}
        padding={10}
    >
        <Text textAlign="center" color={theme.colors.white} fontSize={15}>Cambiar foto de perfil</Text>
    </Button>
    )

}