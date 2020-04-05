import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import CountDown from 'react-native-countdown-component'
import { allActions } from '../store/actions';

export default function Board(props) {
    const [board, setBoard] = useState([]) //sudoku origin board is here
    const [solution, setSolution] = useState([]) //solution is here
    const [screen, setScreen] = useState([]) //what client sees
    const [countdown, setCountdown] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const playerName = props.playerName
    const difficulty = props.difficulty

    //fetching sudoku board from sugoku api
    const fetchData = () => {
        setLoading(true)
        axios
            .get(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
            .then(({ data }) => {
                let newData = data.board
                fetchSolution(newData) //fetch solution here to make sure the solution and the problem is aligned
                setBoard(newData) //set origin board
                setScreen(board) //set what client sees
            })
            .catch(({ response }) => {
                console.log(response)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    //helper from sugoku api (for fetching solution and validate answer)...(1)
    const encodeBoard = (board) =>
        board.reduce((result, row, i) =>
            result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
    //helper from sugoku api (for fetching solution and validate answer)...(2)
    const encodeParams = (params) =>
        Object.keys(params)
            .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
            .join('&');

    //fetching solution here
    const fetchSolution = (payload) => {
        setLoading(true)
        axios
            .post(`https://sugoku.herokuapp.com/solve`, encodeParams({ board: payload }))
            .then(({ data }) => {
                setSolution(data.solution) //set the solution based on the origin board fetch
            })
            .catch(({ response }) => {
                console.log(response)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    //checking answer here
    const validateAnswer = (payload) => {
        setLoading(true)
        axios
            .post(`https://sugoku.herokuapp.com/validate`, encodeParams({ board: payload }))
            .then(({ data }) => {
                if (data.status === 'solved') {
                    // Alert.alert('Status', 'Congratulation you solved the sudoku')
                    props.navigation.navigate('Finish', { //navigate to Finish page with solved status
                        isVictory: 'solved'
                    })
                } else {
                    // Alert.alert('Status', 'Wrong Answer, Please Retry')
                    props.navigation.navigate('Finish', { //navigate to Finish page with unsolved status
                        isVictory: 'unsolved'
                    })
                }
            })
            .catch(({ response }) => {
                console.log(response)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleOnChangeText = (input, i, j) => {
        screen[i][j] = Number(input)
        // setBoard(board)
        setScreen(screen)
    }

    //to handle number, number 0 means it's changeable
    const inputSetting = (num, i, j) => {
        if (num) {
            return (
                <Text style={styles.numSetting}>
                    {num}
                </Text>
            )
        } else {
            return (
                <TextInput
                    style={styles.numSetting}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={input => handleOnChangeText(input, i, j)}>
                </TextInput>
            )
        }
    }

    //to handle when time is up, navigate to finish page
    const timerHandler = () => {
        // Alert.alert('Status', `Time's Up!`)
        props.navigation.navigate('Finish', {
            isVictory: 'unsolved'
        })
    }

    //to start the board and the countdown
    const startHandler = () => {
        setScreen(board)
        setCountdown(true)
    }

    //created
    useEffect(() => {
        fetchData()
        setScreen(board)
    }, [])


    return (
        <View>
            {
                (loading) ?
                    <View>
                        <Text style={styles.loadingSetting}>processing, please wait...</Text>
                    </View>
                    :
                    <View>
                        {
                            (countdown) ?
                                <CountDown
                                    // until={10} 
                                    until={90} //90 seconds
                                    size={25}
                                    onFinish={() => timerHandler()}
                                    digitStyle={{ backgroundColor: '#111' }}
                                    digitTxtStyle={{ color: '#1CC625' }}
                                    timeToShow={['M', 'S']}
                                    timeLabels={{ m: 'MM', s: 'SS' }}
                                />
                                :
                                <Text></Text>
                        }
                        <View style={styles.boardSetting}>
                            {
                                screen.map((row, i) =>
                                    <View key={i}>
                                        {
                                            row.map((num, j) =>
                                                <View key={j} >
                                                    {inputSetting(num, i, j)}
                                                </View>
                                            )
                                        }
                                    </View>)
                            }
                        </View>
                        <View style={{ justifyContent: 'space-evenly' }}>
                            <Text style={{ textAlign: 'center', fontSize: 40, color: '#ffffff' }}>{playerName}</Text>
                            <Text style={{ textAlign: 'center', fontSize: 20, color: '#ffffff' }}>{difficulty} difficulty</Text>
                            <Button
                                onPress={() => {
                                    startHandler()
                                }}
                                title="Start"
                                color="#888888"
                            />
                            <Button
                                onPress={() => {
                                    validateAnswer(screen)
                                    // dispatch(allActions.validateAnswer(screen))
                                }}
                                title="Validate"
                                color="#222222"
                            />
                            <Button
                                onPress={() => {
                                    setScreen(solution)
                                }}
                                title="Solution"
                            />
                        </View>
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    boardSetting: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    numSetting: {
        color: '#fff',
        textAlign: 'center',
        borderWidth: 0.5,
        borderColor: '#fff',
        fontSize: 20,
        width: 40,
        height: 40
    },
    loadingSetting: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: 15
    }
});
