import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Title from '../components/Title';
import { Colours } from '../assets/styles/Colours';
import PrimaryButton from '../components/PrimaryButton';

type Props = {
    rounds: number,
    userNumber: number|null,
    onStartNewGame: () => void,
};

export default function GameOverScreen({ rounds, userNumber, onStartNewGame }: Props): JSX.Element {
    const { width, height } = useWindowDimensions();

    let imageSize = 300;

    if (width < 380) {
        imageSize = 200;
    }

    if (height < 450) {
        imageSize = 100;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
    };

    return (
        <ScrollView style={ styles.screen }>
            <View style={ styles.container }>
                <Title>GAME OVER!</Title>
                <View style={[ styles.imageContainer, imageStyle]}>
                    <Image style={ styles.image } source={ require('../assets/images/success.png') } />
                </View>
                <Text style={ styles.summary }>
                    Your phone needed <Text style={ styles.highlight }>{ rounds }</Text> rounds to guess the number <Text style={ styles.highlight }>{ userNumber }</Text>
                </Text>
                <PrimaryButton onPress={ onStartNewGame }>Start New Game</PrimaryButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        borderWidth: 3,
        borderColor: Colours.primary800,
        overflow: 'hidden',
        margin: 36,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    summary: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24,
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colours.primary500,
    },
});
