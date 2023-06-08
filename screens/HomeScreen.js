import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import log from '../Log';
import Student from '../components/Student';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { CheckBox } from 'react-native-elements';

const HomeScreen = () => {
    const [authInfo, setAuthInfo] = useState();
    const [students, setStudents] = useState([]);
    const [selectedIndex, setIndex] = useState(0);

    // Lấy data login từ AsyncStorage
    const getAuthInfo = async () => {
        try {
            const authInfo = await AsyncStorage.getItem('authInfo');
            if (authInfo !== null) {
                log.info('====> authInfo from AsyncStorage', authInfo);
                setAuthInfo(JSON.parse(authInfo));
            }
        } catch (error) {
            log.error(error);
        }
    };

    // Lấy danh sách sinh viên
    const getListStudent = async () => {
        try {
            const API_URL = 'http://localhost:3000/students';
            const response = await fetch(API_URL);
            const data = await response.json();
            log.info('====> students:', JSON.stringify(data));
            setStudents(data);
        } catch (error) {
            log.error('Fetch data failed ' + error);
        }
    };

    // Xoá dữ liệu
    const deleteStudent = async (item) => {
        try {
            const studentId = item.id;
            const API_URL = 'http://localhost:3000/students/' + studentId;
            const response = await fetch(API_URL, { method: 'DELETE' });
            if (response && response.status === 200) {
                getListStudent();
            }
        } catch (error) {
            log.error('Delete data failed ' + error);
        }
    };

    // React Hooks là những hàm cho phép bạn “kết nối” React state và lifecycle vào các components sử dụng hàm.
    // useState() là 1 react hook
    // 6 trường hợp sử dụng của useEffect() trong React
    // 1.Chạy một lần khi mount : tìm nạp data API.
    // 2.Chạy khi thay đổi state : thường thì khi validate input đầu vào.
    // 3.Chạy khi thay đổi state : filtering trực tiếp.
    // 4.Chạy khi thay đổi state : trigger animation trên giá trị của array mới.
    // 5.Chạy khi props thay đổi : update lại list đã fetched API khi data update.
    // 6.Chạy khi props thay đổi : updateing data API để cập nhật BTC
    useEffect(() => {
        getAuthInfo();
        getListStudent();
    }, []);

    // Danh sách sinh viên (Role ADMIN)
    const renderStudents = () => {
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View>
                    <Text style={styles.txtHeader}>List Student</Text>
                </View>
                <View style={styles.studentContainer}>
                    {students.map((item, index) => {
                        return <Student student={item} key={index} onDelete={deleteStudent}></Student>;
                    })}
                </View>
            </ScrollView>
        );
    };

    // Màn hình cập nhật thông tin (Role Student)
    const rennderForm = () => {
        return (
            <SafeAreaView style={styles.formCotainer}>
                <Text style={styles.formHeader}>Student Infomation</Text>
                <CustomInput placeholder='Fullname' value={''} setValue={''} secureTextEntry={false} />
                <CustomInput placeholder='Email' value={''} setValue={''} secureTextEntry={false} />
                <View style={{ flexDirection: 'row' }}>
                    <CheckBox title='Male' checked={selectedIndex === 0} onPress={() => setIndex(0)} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' />
                    <CheckBox title='Female' checked={selectedIndex === 1} onPress={() => setIndex(1)} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Role: </Text>
                    <Text>{authInfo?.role}</Text>
                </View>
                <CustomButton btnLabel={'Save'} />
            </SafeAreaView>
        );
    };

    // Gọi vào hàm return với dữ liệu ban đầu là là danh sách sinh viên rỗng
    return <SafeAreaView style={styles.container}>{authInfo?.role === 'ADMIN' ? renderStudents() : rennderForm()}</SafeAreaView>;
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
    },
    formCotainer: {
        alignItems: 'center',
        paddingHorizontal: 20
    },
    formHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 20
    }
});

export default HomeScreen;
