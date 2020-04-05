import React from "react";
import {
    StyleSheet,
    View,
    Image
} from "react-native";

//handling what clients see when they win/lose the game
export default function Finish({ route }) {
    const { isVictory } = route.params;

    return (
        <View style={styles.container}>
            <View>
                {
                    (isVictory === 'unsolved') ?
                        <Image
                            style={{ width: 350, height: 350 }}
                            source={{ uri: 'https://i.dlpng.com/static/png/397068_preview.png' }}
                        />
                        :
                        <Image
                            style={{ width: 320, height: 200 }}
                            source={{ uri: 'https://pngimage.net/wp-content/uploads/2018/06/you-win-png-2.png' }}
                        />
                }
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
    }
});