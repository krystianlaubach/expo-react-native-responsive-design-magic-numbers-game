import { StyleSheet, Text } from 'react-native';
import { Colours } from '../assets/styles/Colours';

type Props = {
    children: string,
};

export default function Instructions({ children }: Props): JSX.Element {
    return (
        <Text style={ styles.instruction }>{ children }</Text>
    );
}

const styles = StyleSheet.create({
    instruction: {
        fontFamily: 'open-sans',
        color: Colours.accent500,
        fontSize: 20,
        textAlign: 'center',
    },
});
