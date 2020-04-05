import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Alert
} from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';

export default function WelcomePage({ navigation }) {
    const [name, setName] = useState('')
    const [diff, setDiff] = useState('')

    const pressHandler = (param) => {
        setDiff(param)
        Alert.alert(`You choose ${param.toUpperCase()} difficulty`, `Please press ENTER to continue`)
    }

    const navigationHandler = () => {
        (name && diff) ?
            navigation.navigate('Home', {
                playerName: name,
                difficulty: diff
            })
            :
            ((!name) ?
                Alert.alert(`Please input your username`)
                :
                Alert.alert(`Please choose difficulty`))
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={{ color: 'white', fontSize: 18 }}>Welcome to Sudoku!</Text>
                <Text style={{ color: 'white' }}>enter your name here..</Text>
                <TextInput style={styles.numSetting}
                    onChangeText={(input) => setName(input)} />
                <View style={{ color: '#ffffff' }}>
                    <SwipeRow leftOpenValue={215}>
                        <View style={styles.standaloneRowBack}>
                            <Text
                                style={{ color: '#0000FF' }}
                                onPress={() => pressHandler('easy')}>EASY</Text>
                            <Text
                                style={{ color: '#008000' }}
                                onPress={() => pressHandler('medium')}>MED</Text>
                            <Text
                                style={{ color: '#FF0000' }}
                                onPress={() => pressHandler('hard')}>HARD    </Text>
                        </View>
                        <View style={styles.standaloneRowFront}>
                            <Text style={{ color: '#ffffff' }}> ►► SWIPE TO CLICK DIFFICULTY ►►  </Text>
                        </View>
                    </SwipeRow>
                </View>
                <View>
                    <Text></Text>
                    <Button
                        onPress={() => {
                            navigationHandler()
                        }}
                        title="Enter"
                        color="#203333"
                    />
                </View>
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
    },
    numSetting: {
        color: '#fff',
        textAlign: 'center',
        borderWidth: 0.5,
        borderColor: '#fff',
        fontSize: 20,
        width: 300,
        height: 40
    },
    standaloneRowFront: {
        backgroundColor: '#2B1B17',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 50,
    }
});

