import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Colours } from '../assets/styles/Colours';

type Props = {
    children: number,
};

export default function NumberContainer({ children }: Props): JSX.Element {
    return (
        <View style={ styles.container }>
            <Text style={ styles.numberText }>{ children }</Text>
        </View>
    );
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colours.accent500,
        borderRadius: 8,
        padding: deviceWidth < 380 ? 12 : 24,
        margin: deviceWidth < 380 ? 12 : 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberText: {
        fontFamily: 'open-sans-bold',
        color: Colours.accent500,
        fontSize: deviceWidth < 380 ? 28 : 36,
    },
});
