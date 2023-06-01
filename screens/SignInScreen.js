import React, { useState } from 'react';
import { Text, Alert, Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import log from '../Log';

const SignInScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Tạo biến users để lưu trữ danh sách user của hệ thống
    let users = [];

    // Hàm điều hướng màn hình
    const navigateToHome = () => {
        navigation.navigate('Home');
    };

    // Function lấy dữ liệu từ API sử dụng fetch
    async function fetchData() {
        try {
            // Khai báo đường dẫn API
            const API_URL = 'http://localhost:3000/users';
            const response = await fetch(API_URL);
            // .json() chuyển đổi data trả về từ API sang json
            const data = await response.json();
            users = data;
            log.info('users: ' + JSON.stringify(users));
        } catch (error) {
            log.error('Fetch data failed ' + error);
            return null;
        }
    }

    fetchData();

    storeAuthInfo = async (value) => {
        try {
            const authInfo = JSON.stringify(value);
            await AsyncStorage.setItem('authInfo', authInfo);
        } catch (error) {
            log.info(error);
        }
    };

    const validateAuthInfo = (authInfo) => {
        // Kiểm tra dữ liệu trên form gồm username và password
        if (authInfo.userName === '') {
            setUsernameError('Username field cannot be empty');
            return false;
        }

        if (authInfo.password === '') {
            setPasswordError('Password field cannot be empty');
            return false;
        }

        return true;
    };

    const clearError = () => {
        setUsernameError('');
        setPasswordError('');
    };

    // Funtion thực hiện đăng nhập
    const doLogin = () => {
        // Tạo đối tượng lưu giữ thông tin login
        let request = { userName: username, password: password };
        // In ra thông tin user phục vụ check lỗi
        log.info('authInfo: ' + JSON.stringify(request));
        // Kiêm tra danh sách users có null hoặc undefined không
        if (users) {
            // Validate dữ liệu nhập vào
            const validateResult = validateAuthInfo(request);
            if (validateResult === true) {
                // Tìm user trong danh sách user từ API trả về
                const authInfo = users.find((user) => request.userName === user.userName);
                // Thực hiện validate dữ liệu trên form và hiển thị alert
                if (!authInfo) {
                    Alert.alert('Notification', 'Cant find user infomation', [{ text: 'Cancel', onPress: () => log.error('Cant find user ' + request.userName) }]);
                    clearError();
                } else {
                    if (!(authInfo.password === request.password)) {
                        setPasswordError('Password is not correct');
                        return;
                    } else {
                        clearError();
                        storeAuthInfo(authInfo);
                        Alert.alert('Notification', 'Login successfull ' + request.userName, [
                            { text: 'OK', onPress: () => navigateToHome() },
                            { text: 'Cancel', onPress: () => log.info('Press Cancel') }
                        ]);
                    }
                }
            }
        }
    };

    return (
        <View style={styles.root}>
            <View style={styles.cotainer}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>
            <CustomInput placeholder='Username' value={username} setValue={setUsername} secureTextEntry={false} />
            <Text style={styles.errorTxt}>{usernameError}</Text>
            <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} />
            <Text style={styles.errorTxt}>{passwordError}</Text>
            <CustomButton btnLabel={'Sign In'} onPress={doLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        padding: 20
    },
    cotainer: {
        marginTop: 100,
        alignItems: 'center'
    },
    logo: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain',
        alignItems: 'center'
    },
    errorTxt: {
        color: 'red',
        marginVertical: 5
    }
});

export default SignInScreen;
