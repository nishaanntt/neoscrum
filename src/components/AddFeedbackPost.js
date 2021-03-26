import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';


const FeedbackSchema = yup.object({
    message: yup.string().required().min(4)
})

const AddfeedbackPost =  ({feedbackPost}) => {
    const [message, setMessage] = useState('');

    const handleMessage = (value) => {
        setMessage(value)
    }

    return (
        <View style={styles.container}>
            {
                feedbackPost.map(item => {
                    return (
                        <View key={item.id} style={styles.addFeedbackContainer}>
                            <Image
                                source={require('../images/profilePic.jpeg')}
                                style={styles.profileStyles}
                            />
                            <Text style={styles.userName}>{item.name}</Text>

                            <Formik
                                initialValues={{message: ''}}
                                validationSchema={FeedbackSchema}
                                onSubmit = {(values, actions) => {
                                    handleMessage(values);
                                    actions.resetForm();
                                    console.log(values);
                                }}
                            >
                                {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                                    <View style={{width: '90%'}}>
                                        <TextInput
                                            placeholder='Write your feedback here...'
                                            style={styles.inputStyles}
                                            onChangeText={handleChange('message')}
                                            onBlur={handleBlur('message')}
                                            value={values.message}
                                            maxLength={100}
                                        />
                                        <Text style={styles.errorText}>{ touched.message && errors.message }</Text>
                                        <View style={styles.charcount}>
                                            <Text style={styles.counttext}>{values.message.length}/100</Text>
                                        </View>
                                        <TouchableOpacity style={styles.submitButton} 
                                        onPress={handleSubmit}>
                                            <Text style={styles.submitText}>Give Feedback</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                            </Formik>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
    },
    profileStyles: {
        height: 100,
        width:100,
        borderRadius:50,
        marginBottom: 5,
    },
    userName: {
        color: '#eee',
        fontSize: 18,
    },
    addFeedbackContainer: {
        width: 350,
        height: 350,
        alignItems:'center',
        backgroundColor: '#2e2e2e',
        marginTop:10,
        marginBottom:20,
        padding:10,
        borderRadius: 4,
    },
    inputStyles : {
        padding: 10,
        width: '100%',
        borderColor: '#e4e4e4',
        borderWidth:1,
        borderRadius: 4,
        marginTop: 25,
        backgroundColor: 'white',
    },
    charcount: {
        paddingVertical: 5,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    counttext: {
        color: '#e4e4e4',
        fontSize: 12,
    },
    submitButton: {
        width: '100%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
        // marginBottom: 0,
    },
    submitText: {
        fontSize: 17,
        color: '#000',
        fontWeight:'500',
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 1,
        marginTop: 1,
        fontSize: 12,
    },
})

export default AddfeedbackPost;