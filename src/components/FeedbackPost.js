import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import moment from 'moment';

const FeedbackPost = ({item}) => {

    return (
        <View style={styles.container}>
                        <View style={styles.post} key={item.id}>
                            <View style={styles.postHeader}>
                                <Text style={styles.feedbackTitle}>Feedback</Text>
                                <Text style={styles.feedbackTime}>{moment().startOf('day').fromNow()}</Text>
                            </View>
                            <View style={[styles.feedbackBody], {flex: 1, padding: 10}}>
                                <Text style={{fontSize:16,}}>{item.name}</Text>
                                <View style={{justifyContent: 'flex-end', position: 'absolute', bottom: 10, right: 10,}}>
                                    <Text style={{fontSize: 12,}}>Posted On -</Text>
                                    <Text style={{fontSize: 12,}}>{moment().format('MMMM Do YYYY,')}</Text>
                                    <Text style={{fontSize: 12,}}>{moment().format('h:mm:ss a')}</Text>
                                </View>
                            </View>
                        </View>
        </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        marginHorizontal: 20,
    },
    post: {
        height: 200,
        width:'100%',
        marginBottom:20,
        borderWidth:1,
        borderColor: '#e4e4e4',
        borderRadius: 4,
    },
    postHeader : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding:10,
        backgroundColor: '#2e2e2e',
        margin: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    feedbackTitle: {
        color: '#fff',
        fontSize: 20,
    },
    feedbackTime: {
        fontSize: 12,
        color: '#eee',
    },
    feedbackBody : {
        padding:10,
        margin: 10
    }
})

export default FeedbackPost;