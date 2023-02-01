import { useEffect, useState } from 'react';
import { Alert, FlatList, ListRenderItemInfo, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import RandomNumberGenerator from '../services/RandomNumberGenerator';
import Title from '../components/Title';
import NumberContainer from '../components/NumberContainer';
import PrimaryButton from '../components/PrimaryButton';
import Card from '../components/Card';
import Instructions from '../components/Instructions';
import GuessLogItem from '../components/GuessLogItem';

type Props = {
    userNumber: number,
    onGameOver: (numberOfRounds: number) => void,
};

let minBoundary = 1, maxBoundary = 100;

export default function GameScreen({ userNumber, onGameOver }: Props): JSX.Element {
    const initialGuess: number = RandomNumberGenerator.generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
    const [guesses, setGuesses] = useState<Array<number>>([initialGuess]);

    const { width, height } = useWindowDimensions();

    useEffect((): void => {
        if (currentGuess === userNumber) {
            onGameOver(guesses.length);
            minBoundary = 1;
            maxBoundary = 100;
        }
    }, [currentGuess, userNumber, guesses, onGameOver]);

    const nextGuess = (direction: 'lower'|'greater'): void => {
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert(
                "Don't lie!",
                'You know this is wrong...',
                [{text: "I'm Sorry!", style: 'cancel'}],
            );

            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        }

        if (direction === 'greater') {
            minBoundary = currentGuess + 1;
        }

        const newRandomNumber = RandomNumberGenerator.generateRandomBetween(minBoundary, maxBoundary, currentGuess);

        setCurrentGuess(newRandomNumber);
        setGuesses(prevGuesses => [newRandomNumber, ...prevGuesses]);
    };

    const lower = (): void => {
        nextGuess('lower');
    };

    const greater = (): void => {
        nextGuess('greater')
    };

    const renderGuesses = (itemData: ListRenderItemInfo<number>): JSX.Element => {
        const roundNumber: number = guesses.length - itemData.index;
        const guess: number = itemData.item;

        return (
            <GuessLogItem roundNumber={ roundNumber } guess={ guess } />
        );
    };

    const getKey = (guess: number) : string => {
        return guess.toString();
    };

    let content = <>
        <NumberContainer>{ currentGuess }</NumberContainer>
        <Card style={ styles.card }>
            <Instructions>Lower or Greater</Instructions>
            <View style={ styles.buttonsContainer }>
                <View style={ styles.buttonContainer }>
                    <PrimaryButton onPress={ lower }>
                        <Ionicons name='md-remove' size={24} />
                    </PrimaryButton>
                </View>
                <View style={ styles.buttonContainer }>
                    <PrimaryButton onPress={ greater }>
                        <Ionicons name='md-add' size={24} />
                    </PrimaryButton>
                </View>
            </View>
        </Card>
    </>;

    if (width > 500) {
        content = <>
            <View style={ styles.buttonsContainerWide }>
                <View style={ styles.buttonContainer }>
                    <PrimaryButton onPress={ lower }>
                        <Ionicons name='md-remove' size={24} />
                    </PrimaryButton>
                </View>
                <NumberContainer>{ currentGuess }</NumberContainer>
                <View style={ styles.buttonContainer }>
                    <PrimaryButton onPress={ greater }>
                        <Ionicons name='md-add' size={24} />
                    </PrimaryButton>
                </View>
            </View>
        </>;
    }

    return (
        <View style={ styles.screen }>
            <Title>Opponent's Guess</Title>
            { content }
            <View style={ styles.guessesContainer }>
                <FlatList data={ guesses } renderItem={ renderGuesses } keyExtractor={ getKey } />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 24,
        paddingHorizontal: 24,
    },
    card: {
        marginHorizontal: 24,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 16,
    },
    buttonContainer: {
        flex: 1,
    },
    buttonsContainerWide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    guessesContainer: {
        flex: 1,
        padding: 16,
    },
});
