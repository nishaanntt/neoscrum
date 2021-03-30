import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Header } from '../components/Header'
import AddFeedbackPost from '../components/AddFeedbackPost';
import axios from 'axios';


const AddFeedback = () => {

    const [feedbackPost, setFeedbackPost] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchFeedbackPosts = () => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            setFeedbackPost(response.data)
        })
        .catch((error) => {
            alert(error.message);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchFeedbackPosts()
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
            </View>
            <View style={styles.body}>
                <View>
                    <Text style={styles.title}>Add Feedback</Text>
                </View>
                { isLoading ? 
                    (
                        <ActivityIndicator color='#bc0000' style={styles.activityIndicator} size={48} />
                    )
                    :
                    (
                        <ScrollView>
                            <AddFeedbackPost feedbackPost={feedbackPost} />
                        </ScrollView>
                    )
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

export default AddFeedback;