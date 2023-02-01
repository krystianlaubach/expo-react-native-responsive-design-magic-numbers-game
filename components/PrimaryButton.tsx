import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colours } from '../assets/styles/Colours';

type Props = {
    children: string|ReactNode,
    onPress: () => void,
};

export default function PrimaryButton({ children, onPress }: Props): JSX.Element {
    return (
        <View style={ styles.buttonOuterContainer }>
            <Pressable style={({pressed}) => [styles.buttonInnerContainer, pressed ? styles.active : styles.idle] } onPress={ onPress }>
                <Text style={ styles.buttonText }>{ children }</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        margin: 4,
        borderRadius: 28,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 5,
        shadowColor: Colours.black,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.3,
    },
    idle: {
        backgroundColor: Colours.primary500,
    },
    active: {
        backgroundColor: Colours.primary600,
    },
    buttonText: {
        textAlign: 'center',
        color: Colours.white,
    },
});
