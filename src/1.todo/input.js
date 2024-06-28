import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView ,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-ionicons';
const dele = require('./delete.png');
function Input() {
    const [input, setInput] = useState('');
    const [array, setArray] = useState([]);
    const [count, setcount] = useState(0)
    // console.warn({count});

    useEffect(() => {
        // Load stored todo items from AsyncStorage on component mount
        loadTodos();
    }, []);

    useEffect(() => {
        // Save todo items to AsyncStorage whenever array changes
        saveTodos();
    }, [array]);

    const loadTodos = async () => {
        try {
            const storedTodos = await AsyncStorage.getItem('todos');
            if (storedTodos !== null) {
                setArray(JSON.parse(storedTodos));
            }
        } catch (error) {
            console.error('Error loading todos:', error);
        }
    };

    const saveTodos = async () => {
        try {
            await AsyncStorage.setItem('todos', JSON.stringify(array));
        } catch (error) {
            console.error('Error saving todos:', error);
        }
    };

    function onSubmit() {
        if (input.trim() !== '') {
            setArray(prevArray => [...prevArray, { text: input, completed: false }]);
            setInput('');
        }
    }

    function onDelete(index) {
        setArray(prevArray => prevArray.filter((_, i) => i !== index));
    }

    function toggleCompleted(index) {
        setArray(prevArray =>
            prevArray.map((item, i) => {
                if (i === index) {
                    const updatedItem = { ...item, completed: !item.completed };
                    // Update count based on the change in completion status
                    setcount(count + (updatedItem.completed ? 1 : -1));
                    return updatedItem;
                } else {
                    return item;
                }
            })
        );
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40, }}>
            <View style={design.todo_done} >
                <View>
                    <Text style={design.heading}>Todo Done</Text>
                    <Text style={{ color: '#D2C3A8' }}>keep it up</Text>

                </View>
                <View style={{ backgroundColor: '#FE5630', height: 150, width: 150, marginLeft: 25, borderRadius: 60 }}>
                    <Text style={{ color: '#0C0D0C', margin: 45, fontSize: 35, fontWeight: '800' }}>{count}/{array.length}</Text>
                </View>
            </View>
            <ScrollView>

                {/* -------Write tour text task------- */}

                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 15, marginLeft: 15 }}>
                    <TextInput
                        placeholder='write your next task'
                        placeholderTextColor='#D2C3A8'
                        value={input}
                        style={design.input}
                        onChangeText={setInput}
                    />
                    <TouchableOpacity style={design.add} onPress={onSubmit}>
                        <Text style={{ fontWeight: 800, color: 'black', fontSize: 35, }}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* -----List of todo display------- */}

                <View style={{ marginTop: 50 }}>
                    {array.map((item, index) => (
                        <View key={index} style={design.taskItemContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {/* {console.warn(item.completed)} */}
                                <TouchableOpacity onPress={() => toggleCompleted(index)}>
                                    <View style={{
                                        height: 35,
                                        width: 35,
                                        backgroundColor: item.completed ? 'green' : 'transparent',
                                        borderRadius: 50,
                                        marginRight: 10,
                                        borderWidth: 2,
                                        borderColor: '#FE5630',
                                        borderColor: item.completed ? 'transparent' : '#FE5630',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginLeft:15 
                                    }}>
                                        {item.completed}
                                    </View>
                                </TouchableOpacity>

                                <Text style={[design.list_items, item.completed && design.completedTask]}>
                                    {item.text}
                                </Text>
                            </View>
                            <View style={design.icons}>
                                <View style={design.buttonContainer}>
                                    <TouchableOpacity onPress={() => onDelete(index)}>
                                    <Image source={require('./delete.png')} style={design.deleteIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    ))}
                </View>
            </ScrollView>

        </View>
    );
}

const design = StyleSheet.create({
    heading: {
        fontWeight: 'bold',
        fontSize: 23,
        marginTop: 25,
        color: '#D2C3A8',
    },
    todo_done: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderColor: 'grey',
        borderWidth: 2,
        height: 200
    },
    deleteIcon: {
        width: 25,
        height: 25,
    },
    icons: {
        flexDirection: 'row',
        position: 'absolute',
        right: 20,
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 235
    },
    buttonContainer: {
        margin: 8
    },
    list_items: {
        marginLeft:2,
        fontSize: 21,
        fontWeight: '700',
        paddingVertical: 0,
        paddingHorizontal: 10,
        flex: 1, // Let the text container flex to occupy remaining space
        color: "#D2C3A8",
    },

    input: {
        width: 290,
        fontSize: 18,
        color: '#D2C3A8',
        marginTop: 15,
        borderRadius: 20,
        borderWidth: 2,
        paddingHorizontal: 16,
        backgroundColor: '#1F1E1F'
    },
    add: {
        backgroundColor: '#FE5630',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginLeft: 22,
        marginTop: 15
    },
    taskItemContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#1F1E1F',
        width: '92%',
        height: 65,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'grey',

    },
    deleteButton: {
        color: 'red',
        fontWeight: 'bold',
    },
    completedTask: {
        textDecorationLine: 'line-through',

    },

});

export default Input;
