import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList } from 'react-native';
import { Header } from '../components/Header';
import FeedbackPost from '../components/FeedbackPost';
import axios from 'axios';

export function Dashboard () {

    const [feedbackMessage, setFeedbackMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchFeedback = () => {
        axios.get('https://jsonplaceholder.typicode.com/comments')
        .then((response) => {
            setFeedbackMessage(response.data)
            // console.log(response.data);
        })
        .catch((error) => {
            alert(error.message);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchFeedback()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
            </View>
            <View style={styles.body}>
                <View>
                    <Text style={styles.title}>Feedbacks</Text>
                </View>
                { isLoading ? 
                    (
                        <ActivityIndicator color='#bc0000' style={styles.activityIndicator} size={48} />
                    )
                    :
                        <FlatList 
                            data={feedbackMessage}
                            keyExtractor={({ id }) => id.toString()}
                            renderItem={({item}) => (
                                <FeedbackPost item={item} />
                            )}
                        />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
    },
    body: {
        flex: 8,
        paddingTop: 0,
        alignItems: 'center',
    },
    title: {
        fontSize: 21,
    },
    activityIndicator: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
})