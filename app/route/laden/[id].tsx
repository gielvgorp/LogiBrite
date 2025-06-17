import { AppHeader } from '@/components/AppHeader'
import LoadingItem from '@/components/LoadingList/LoadingItem'
import { routeService } from '@/services/routeService'
import { FontAwesome5 } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Index = () => {
      const { id } = useLocalSearchParams();

    const [isLocked, setIsLocked] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [stops, setStops] = useState<RouteStop[] | undefined>([]);
    const [totalItems, setTotalItems] = useState<DeliveryItems[]>([]);
    const router = useRouter();

    useEffect(() => {
      const fetchStops = async () => {
        const route = await routeService.getRouteById(parseInt(id.toString()));
        setStops(route?.stops ?? []);
        setIsLocked(route?.isLocked ?? true);
        setIsLoading(false);
      };

      fetchStops();
    }, []);

    useEffect(() => {
       if (stops) {
          stops.forEach(stop => {
            handleAddTotalItems(stop.items);
          });
        }
    }, [stops]);

     const handleAddTotalItems = (newItems: DeliveryItems[]) => {
  setTotalItems(prevItems => {
    const itemsMap: Record<string, DeliveryItems> = {};

    prevItems.forEach(item => {
      itemsMap[item.id] = { ...item };
    });

    newItems.forEach(newItem => {
      if (itemsMap[newItem.id]) {
        itemsMap[newItem.id].quantity += newItem.quantity;
      } else {
        itemsMap[newItem.id] = { ...newItem };
      }
    });

    return Object.values(itemsMap);
  });
};
    const handlePress = () => {
         if(!isLocked){
            router.push(`../${id}/stop/1`);
            return;
        }
        
    setModalVisible(true);
  };

  const handleSubmit = () => {
    if (inputValue === '123') {
      routeService.changeRouteIsLocked(parseInt(id.toString()), false);
      setIsLocked(false);
    }
    setModalVisible(false);
    setInputValue('');
  };


  return (
    <View className='flex-1'>
        <AppHeader title={`Route ${id}`} showBackButton={true} />
        {
            isLoading ? 
              <ActivityIndicator size="large" className='mt-5' /> :  
              <>
                <ScrollView className='pt-8 px-5'>
                  <Text className='font-bold text-center text-5xl'>Laadlijst</Text>
                  {
                    
                      <View className='w-full flex-col'>
                        {
                          stops && stops
                            .slice()
                            .sort((a, b) => b.stopNumber - a.stopNumber)
                            .map((stop) => (
                              <LoadingItem
                                key={parseInt(stop.id) + 1}
                                customerName={stop.customer.name}
                                address={stop.customer.address}
                                items={stop.items}
                                stopId={stop.stopNumber}
                              />
                            ))
                        }

                          <LoadingItem key={100} customerName='Totale laadlijst' stopId={1} totalOverview={true} items={totalItems} />
                      </View>
                    }
                  <View className='h-10' />
                </ScrollView>
          <TouchableOpacity onPress={handlePress} className='h-[80px] w-full bg-white flex-row items-center justify-center px-5'>
              <View className={`${isLocked ? 'bg-red-600' : 'bg-green-600'} w-auto h-[50px] px-3 rounded-full flex-row items-center justify-center`}>
                  {
                      isLocked ? 
                      <>
                        <Text className='text-white font-bold pe-3'>Route vergrendeld</Text>
                        <FontAwesome5 name="lock" size={15} color="white" />
                      </> : 
                      <>
                        <Text className='text-white font-bold pe-3'>Route vrijgegeven</Text>
                        <FontAwesome5 name="unlock" size={15} color="white" />
                      </>
                  }
              </View>
          </TouchableOpacity>
              </>
        }
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