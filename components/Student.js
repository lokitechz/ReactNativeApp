import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Student = ({ student, onDelete }) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemImageContainer}>
                {student.gender === 'Male' ? (
                    <Image style={styles.itemImage} source={require('../assets/images/male.png')} resizeMode='contain' />
                ) : (
                    <Image style={styles.itemImage} source={require('../assets/images/female.png')} resizeMode='contain' />
                )}
            </View>
            <View>
                <Text>{student.id}</Text>
                <Text>{student.fullName}</Text>
                <Text>{student.gender}</Text>
                <Text>{student.email}</Text>
                <Text>{student.dateOfBirth}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(student)}>
                <FontAwesome5 name='trash-alt' size={25} color='red' />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 0.5
    },
    itemImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    itemImage: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    deleteButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default Student;
