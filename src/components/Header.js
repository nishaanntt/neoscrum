import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity 
} from 'react-native';
import { AuthContext } from '../components/Context';

export function Header () {

    const { signOut } = React.useContext(AuthContext);

    return (
        
            <View style={styles.header}>
                <View style={styles.userProfile}>
                    <Image 
                        source={require('../images/profilePic.jpeg')}
                        style={styles.profileImg}
                    />
                    <Text style={styles.user}>Profile</Text>
                </View>
                <TouchableOpacity 
                    style={styles.logoutButton}
                    onPress={()=>{signOut()}}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#000',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userProfile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    user: {
        paddingLeft: 5,
        fontSize: 20,
        fontWeight: '300',
        color: '#eee',
    },
    profileImg: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
    },
    logoutButton: {
        backgroundColor: '#eee',
        // borderWidth: 1,
        // borderColor: '#e5e5e5',
        paddingHorizontal: 5,
        width: 85,
        borderRadius: 4,
        alignItems: 'center',
        paddingVertical: 10,
        elevation: 10,
    },
    buttonText: {
        fontSize: 16,
        color: "#000",
    },
})