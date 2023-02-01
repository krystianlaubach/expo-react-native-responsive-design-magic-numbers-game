import { Platform, StyleSheet, Text } from 'react-native';
import { Colours } from '../assets/styles/Colours';

type Props = {
    children: string,
};

export default function Title({ children }: Props) {
    return (
        <Text style={ styles.title }>{ children }</Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        color: Colours.white,
        textAlign: 'center',
        borderWidth: Platform.select({ ios: 0, android: 2 }),
        borderColor: Colours.white,
        padding: 12,
    },
});
