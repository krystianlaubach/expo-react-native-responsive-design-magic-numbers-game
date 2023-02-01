import { StyleSheet, Text, View } from 'react-native';
import { Colours } from '../assets/styles/Colours';

type Props = {
    roundNumber: number,
    guess: number,
};

export default function GuessLogItem({ roundNumber, guess }: Props) {
    return (
        <View style={ styles.listItem }>
            <Text style={ styles.itemText }>#{ roundNumber }</Text>
            <Text style={ styles.itemText }>Opponent's Guess: { guess }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        borderColor: Colours.primary800,
        borderWidth: 1,
        borderRadius: 40,
        padding: 12,
        marginVertical: 8,
        backgroundColor: Colours.accent500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        elevation: 5,
        shadowColor: Colours.black,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.3
    },
    itemText: {
        fontFamily: 'open-sans',
    },
});
