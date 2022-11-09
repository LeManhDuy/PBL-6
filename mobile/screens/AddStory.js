import { SafeAreaView } from "react-native"
import { Text, View, TextInput, Button   } from "react-native"
import { Formik } from 'formik';
import React from "react";
import { COLORS, SIZES } from "../constants";

const AddStory = () => {
    // const handleSubmit = () => {
        
    // }
    return (
        <SafeAreaView >
            <View style={{
                height: "100%",
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
            }}>
            <Formik
                initialValues={{
                    title: "",
                    type: "",
                    status: "",
                    number_of_chapter: 0,
                    number_read: 0,
                    cover: "",
                    last_read_link: "",
                    synopsis:"",
                    memorable_character: ""
                }}
                onSubmit={values => console.log(values)}
                >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={{
                        backgroundColor: COLORS.primary, 
                        width: "75%", 
                        height: "90%",
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        borderRadius: SIZES.large
                    }}>
                    <TextInput
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    placeholder={"Title"}
                    value={values.title}
                    style={{backgroundColor: COLORS.white, width:"90%", padding:20, borderRadius: SIZES.large}}
                    />
                    <TextInput
                    onChangeText={handleChange('type')}
                    onBlur={handleBlur('type')}
                    value={values.type}
                    placeholder={"Type"}
                    style={{backgroundColor: COLORS.white, width:"90%", padding:20, borderRadius: SIZES.large}}
                    />
                    <TextInput
                    onChangeText={handleChange('cover')}
                    onBlur={handleBlur('cover')}
                    placeholder={"Cover"}
                    value={values.cover}
                    style={{backgroundColor: COLORS.white, width:"90%", padding:20, borderRadius: SIZES.large}}
                    />
                    <TextInput
                    onChangeText={handleChange('status')}
                    onBlur={handleBlur('status')}
                    placeholder={"Status"}
                    value={values.status}
                    style={{backgroundColor: COLORS.white, width:"90%", padding:20, borderRadius: SIZES.large}}
                    />
                    <TextInput
                    onChangeText={handleChange('number_of_chapter')}
                    onBlur={handleBlur('number_of_chapter')}
                    placeholder={"number_of_chapter"}
                    value={values.number_of_chapter}
                    style={{backgroundColor: COLORS.white, width:"90%", padding:20, borderRadius: SIZES.large}}
                    />
                    <TextInput
                    onChangeText={handleChange('number_read')}
                    onBlur={handleBlur('number_read')}
                    placeholder={"number_read"}
                    value={values.number_read}
                    style={{backgroundColor: COLORS.white, width:"90%", padding:20, borderRadius: SIZES.large}}
                    />
                    <TextInput
                    onChangeText={handleChange('last_read_link')}
                    onBlur={handleBlur('last_read_link')}
                    placeholder={"last_read_link"}
                    value={values.last_read_link}
                    style={{backgroundColor: COLORS.white, width:"90%", padding:20, borderRadius: SIZES.large}}
                    />
                    <TextInput
                    onChangeText={handleChange('synopsis')}
                    onBlur={handleBlur('synopsis')}
                    placeholder={"synopsis"}
                    value={values.synopsis}
                    style={{backgroundColor: COLORS.white, width:"90%", padding:20, borderRadius: SIZES.large}}
                    />
                    <TextInput
                    onChangeText={handleChange('memorable_character')}
                    onBlur={handleBlur('memorable_character')}
                    placeholder={"memorable_character"}
                    value={values.memorable_character}
                    style={{backgroundColor: COLORS.white, width:"90%", padding:20, borderRadius: SIZES.large}}
                    />
                    <Button onPress={handleSubmit} title="Submit"/>
                </View>
                )}
            </Formik>
            </View>
        </SafeAreaView>
    )
}

export default AddStory