import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import log from '../Log';
import Student from '../components/Student';

const HomeScreen = ({ navigation }) => {
    const [students, setStudents] = useState([]);

    // Hàm điều hướng
    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    // Gọi function
    async function getListStudent() {
        try {
            const API_URL = 'http://localhost:3000/students';
            const response = await fetch(API_URL);
            const data = await response.json();
            setStudents(data);
            log.info('====> students:', JSON.stringify(data));
        } catch (error) {
            log.error('Fetch data failed ' + error);
        }
    }

    // Hooks là những hàm cho phép bạn “kết nối” React state và lifecycle vào các components sử dụng hàm.
    // useState() là 1 react hook
    // 6 trường hợp sử dụng của useEffect() trong React
    // 1.Chạy một lần khi mount : tìm nạp data API.
    // 2.Chạy khi thay đổi state : thường thì khi validate input đầu vào.
    // 3.Chạy khi thay đổi state : filtering trực tiếp.
    // 4.Chạy khi thay đổi state : trigger animation trên giá trị của array mới.
    // 5.Chạy khi props thay đổi : update lại list đã fetched API khi data update.
    // 6.Chạy khi props thay đổi : updateing data API để cập nhật BTC
    useEffect(() => {
        console.log('useEffect has been called!');
        getListStudent();
    }, []);

    // Gọi vào hàm return với dữ liệu ban đầu là là danh sách sinh viên rỗng
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollView}>
                <Button title='Go to Login Screen' onPress={navigateToLogin} />
                <View>
                    <Text style={styles.txtHeader}>List Student</Text>
                </View>
                <View style={styles.studentContainer}>
                    {students.map((item, index) => {
                        return <Student student={item} key={index}></Student>;
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flexGrow: 1,
        padding: 20
    },
    txtHeader: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    studentContainer: {
        flex: 1
    }
});

export default HomeScreen;
