import { Button } from "tamagui"

export const EditInfoButton = (props: {children: string, marginTop?: number}) => {
    return (
        <Button 
            height={35}
            marginBottom={10}
            marginTop={props.marginTop || 0}
            >
        
        {props.children}
        </Button>
    )
}