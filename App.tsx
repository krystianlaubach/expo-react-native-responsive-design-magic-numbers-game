import { ReactNode, useCallback, useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import { Colours } from './assets/styles/Colours';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App(): JSX.Element|null {
    const [userNumber, setUserNumber] = useState<number|null>(null);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [rounds, setRounds] = useState<number>(0);

    const [fontsLoaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

    const prepare = async (): Promise<boolean> => {
        return await SplashScreen.preventAutoHideAsync();
    };

    const hideSplash = async (): Promise<boolean> => {
        return await SplashScreen.hideAsync();
    };

    useEffect(() => {
        prepare();
    }, []);

    const onLayoutRootView = useCallback(() => {
        if (fontsLoaded) {
            hideSplash();
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null;
    }

    const pickedNumberHandler = (pickedNumber: number): void => {
        setUserNumber(pickedNumber);
    };

    const gameOverHandler = (numberOfRounds: number): void => {
        setGameOver(true);
        setRounds(numberOfRounds);
    };

    const startNewGameHandler = (): void => {
        setUserNumber(null);
        setGameOver(false);
        setRounds(0);
    };

    const getScreen = (): ReactNode => {
        let screen: ReactNode = <StartGameScreen onPickNumber={ pickedNumberHandler } />;

        if (userNumber) {
            screen = <GameScreen userNumber={ userNumber } onGameOver={ gameOverHandler } />;
        }

        if (gameOver) {
            screen = <GameOverScreen rounds={ rounds } userNumber={ userNumber } onStartNewGame={ startNewGameHandler } />
        }

        return screen;
    };

    return (
        <>
            <StatusBar style='light' />
            <LinearGradient colors={[ Colours.primary700, Colours.accent500 ]} style={ styles.rootScreen }>
                <SafeAreaView style={ styles.rootScreen } onLayout={ onLayoutRootView }>
                    <ImageBackground
                        source={ require('./assets/images/background.png') }
                        resizeMode='cover'
                        style={ styles.rootScreen }
                        imageStyle={ styles.backgroundImage }
                    >
                        { getScreen() }
                    </ImageBackground>
                </SafeAreaView>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    },
});
