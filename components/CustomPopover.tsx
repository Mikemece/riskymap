import { Button, Popover } from "tamagui";
import { theme } from "./theme";

export const CustomPopover = ({ icon }: any) => {
    return (
        <Button
        icon={icon}
        backgroundColor={theme.colors.greenPrimary}
        width={57}
        height={45}
        borderRadius={10}
        marginRight={10}
        pressStyle={{ backgroundColor: theme.colors.greenPrimaryPressed, borderColor: theme.colors.greenPrimaryPressed }}
    />
    );
}