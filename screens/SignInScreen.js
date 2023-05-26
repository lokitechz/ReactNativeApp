import React, { useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import log from '../log';

const SignInScreen = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // Tạo biến users để lưu trữ danh sách user của hệ thống
    let users = [];

    // Function lấy dữ liệu từ API sử dụng fetch
    async function fetchData() {
        try {
            // Khai báo đường dẫn API
            const API_URL = 'http://localhost:3000/users';
            const response = await fetch(API_URL);
            // .json() chuyển đổi data trả về từ API sang json
            const data = await response.json();
            return data;
        } catch (error) {
            log.error('Fetch data failed ' + error);
            return null;
        }
    }

    // Function gọi fetchData sau đó lưu response từ API trả về vào biến users
    async function storeData() {
        users = await fetchData();
    }

    storeData();

    // Funtion thực hiện đăng nhập
    const doLogin = () => {
        // Kiểm tra dữ liệu trên form gồm username và password
        if (username.length == 0) {
            Alert.alert('Username is required');
            return;
        }

        if (password.length == 0) {
            Alert.alert('Password is required');
            return;
        }

        // Tạo đối tượng lưu giữ thông tin login
        let request = { username: username, password: password };

        // In ra thông tin user phục vụ check lỗi
        log.info('authInfo: ' + JSON.stringify(request));

        // Kiêm tra danh sách users có null hoặc undefined không
        if (users) {
            const authInfo = users.find((user) => user.userName === request.username);
            // Thực hiện validate dữ liệu trên form và hiển thị alert
            if (!authInfo) {
                Alert.alert('Notification', 'Cant find user infomation', [{ text: 'Cancel', onPress: () => log.error('Cant find user ' + request.username) }]);
            } else {
                if (!(authInfo.password === request.password)) {
                    Alert.alert('Notification', 'Password is not correct', [{ text: 'Cancel', onPress: () => log.error('Password is not correct for ' + request.username) }]);
                } else {
                    Alert.alert('Notification', 'Login successfull ' + request.username, [
                        { text: 'OK', onPress: () => navigateToHome() },
                        { text: 'Cancel', onPress: () => log.info('Press Cancel') }
                    ]);
                }
            }
        }
    };

    const navigateToHome = () => {
        props.navigation.navigate('Home');
    };

    return (
        <View style={styles.root}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <CustomInput placeholder='Username' value={username} setValue={setUsername} secureTextEntry={false} />
            <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} />
            <CustomButton btnLabel={'Sign In'} onPress={doLogin} />
            <CustomButton btnLabel={'Back to Home'} onPress={navigateToHome} />
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20
    },
    logo: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain'
    }
});
