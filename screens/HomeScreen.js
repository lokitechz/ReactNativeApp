import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, View, Text, StyleSheet, ScrollView } from 'react-native';
import log from '../Log';

const HomeScreen = ({ navigation }) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getListStudent();
    }, []);

    // Hàm điều hướng
    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    async function getListStudent() {
        try {
            // Khai báo đường dẫn API
            const API_URL = 'http://localhost:3000/students';
            const response = await fetch(API_URL);
            // .json() chuyển đổi data trả về từ API sang json
            const data = await response.json();
            setStudents(data);
            return data;
        } catch (error) {
            log.error('Fetch data failed ' + error);
            return null;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flex: 1, padding: 20 }}>
                <Button title='Go to Login Screen' onPress={navigateToLogin} />
                <View>
                    <Text style={styles.txtHeader}>List Student</Text>
                </View>
                <View style={styles.container}>
                    {students.map((item, index) => {
                        return (
                            <View style={styles.item} key={index}>
                                <View style={styles.itemImage} />
                                <View style={{ paddingLeft: 15 }}>
                                    <Text>{item.studentId}</Text>
                                    <Text>{item.fullName}</Text>
                                    <Text>{item.gender}</Text>
                                    <Text>{item.email}</Text>
                                    <Text>{item.dateOfBirth}</Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    txtHeader: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    item: {
        paddingVertical: 15,
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 0.5,
        flexDirection: 'row'
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: '#E6E6E6'
    }
});

export default HomeScreen;
