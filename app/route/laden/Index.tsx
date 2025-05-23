import { AppHeader } from '@/components/AppHeader'
import LoadingItem from '@/components/LoadingList/LoadingItem'
import { FontAwesome5 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Index = () => {
    const [isLocked, setIsLocked] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();

    const handlePress = () => {
         if(!isLocked){
            router.push("../stop/1");
            return;
        }
        
    setModalVisible(true);
  };

  const handleSubmit = () => {
    if (inputValue === '123') {
      setIsLocked(!isLocked);
    }
    setModalVisible(false);
    setInputValue('');
  };

  return (
    <View className='flex-1'>
        <AppHeader title='Laden' />
        <ScrollView className='pt-8 mx-4'>
            <Text className='font-bold text-center text-5xl'>Laadlijst</Text>
            <View className='w-full flex-col'>
                <LoadingItem customerName='John Smith' address='Stationstraat 1A, Amsterdam' stopId='3' />
                <LoadingItem customerName='John Smith' address='Stationstraat 1A, Amsterdam' stopId='2' />
                <LoadingItem customerName='John Smith' address='Stationstraat 1A, Amsterdam' stopId='1' />
                <LoadingItem customerName='Totale laadlijst' stopId='1' totalOverview={true} />
            </View>
            <View className='h-10' />
        </ScrollView>
        <TouchableOpacity onPress={handlePress} className='h-[80px] w-full bg-white flex-row items-center justify-end px-4'>
            <View className={`${isLocked ? 'bg-red-600' : 'bg-green-600'} w-[50px] h-[50px] rounded-full flex-row items-center justify-center`}>
                {
                    isLocked ? <FontAwesome5 name="lock" size={15} color="white" /> : <FontAwesome5 name="unlock" size={15} color="white" />
                }
            </View>
        </TouchableOpacity>
         <Modal visible={modalVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text className='font-bold pb-4'>Voer de code in:</Text>
                    <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={inputValue}
                    onChangeText={setInputValue}
                    placeholder="123"
                    />
                    <TouchableOpacity onPress={handleSubmit} style={styles.button} className='flex-row justify-center'>
                    <Text style={styles.buttonText}>Bevestigen</Text>
                    </TouchableOpacity>
                </View>
            </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000099' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center', width: '90%' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginVertical: 10, width: '100%', textAlign: 'center' },
  button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, width: '100%' },
  buttonText: { color: 'white' },
});

export default Index