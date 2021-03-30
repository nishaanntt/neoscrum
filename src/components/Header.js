import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity 
} from 'react-native';
import { AuthContext } from '../components/Context';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'

export function Header () {
    
    const navigation = useNavigation();

    return (
        
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Icon 
                        name='bars'
                        size={20}
                        color='#eee'
                        onPress={()=>navigation.openDrawer()}
                    />
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleNeo}>
                        Neo
                        <Text style={styles.titleScrum}>
                            SCRUM
                        </Text>
                    </Text>
                </View>
            </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 60,
        backgroundColor: '#000',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerLeft: {
        position: 'absolute',
        left: 20,
        marginLeft: 14,
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleNeo: {
        fontSize: 21,
        color: '#eee',
        fontWeight: 'bold'
    },
    titleScrum: {
        color: 'pink'
    }
})