import { Progress, Text } from "tamagui"
import { theme } from "./theme"

export const RankSlider = (props: { votes: number }) => {

    let renderedVotes = props.votes;
    while (renderedVotes >= 50) {
        renderedVotes -= 50;
    }

    return (
        <>
            <Progress 
                value={renderedVotes * 2} 
                width={250} 
                height={10} 
                backgroundColor={theme.colors.blueDark} 
                borderWidth={1}
                borderColor={theme.colors.blueDark} >
                <Progress.Indicator animation="bouncy" backgroundColor={theme.colors.blueLight} />
            </Progress>
            <Text fontSize={22}>Votos: {props.votes}</Text>
            <Text fontSize={15}>Necesita {50 - renderedVotes} más para subir de rango</Text>
        </>
    )
}