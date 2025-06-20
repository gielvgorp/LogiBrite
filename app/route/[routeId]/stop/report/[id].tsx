import { AppHeader } from '@/components/AppHeader';
import { routeService } from '@/services/routeService';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

export default function Index() {
  const router = useRouter();
  const { routeId, id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<DeliveryItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [note, setNote] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const stop = await routeService.getStopById(parseInt(routeId.toString()), id.toString());
      setItems(Array.isArray(stop?.items) ? stop.items : []);

      const initialChecks: { [key: string]: boolean } = {};
      stop?.items?.forEach((item: DeliveryItem) => {
        initialChecks[item.id] = false;
      });

      console.log(stop.report);
      if (stop?.report) {
        setNote(stop.report.note);

        stop.report.items.forEach((reportItem: ReportSelectedItem) => {
          initialChecks[reportItem.itemId] = reportItem.isSelected;
        });
      }

      setCheckedItems(initialChecks);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const toggleItemChecked = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

const handleReportProblem = () => {
  const selectedItems: ReportSelectedItem[] = Object.entries(checkedItems).map(
    ([itemId, isSelected]) => ({
      itemId: parseInt(itemId),
      isSelected,
    })
  );

  routeService.createReport(
    parseInt(routeId.toString()),
    id.toString(),
    note,
    selectedItems
  );

  Alert.alert('Succes', 'Het probleem is succesvol opgeslagen.');
};


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <AppHeader title={`Route ${routeId}`} showBackButton={true} />

        {isLoading ? (
          <ActivityIndicator size="large" className="mt-5" />
        ) : (
          <ScrollView className="w-full pt-5 px-6 flex-1">
            {/* Selecteer producten blok */}
            <View className="flex-col bg-white p-5 rounded shadow mb-5">
              <View className="flex-row items-center pb-5">
                <View className="w-10 h-10 flex-row justify-center items-center bg-blue-300 rounded-3xl">
                  <FontAwesome5 name="route" size={17} color="#0062CC" />
                </View>
                <Text className="font-bold text-xl ps-3">Selecteer de product(en)</Text>
              </View>

              {items.map((item) => (
                <View key={item.id} className="flex-row justify-between items-center py-2">
                  <View>
                    <Text className="text-base font-medium">{item.itemName}</Text>
                    <Text className="text-gray-500 text-sm">Aantal: {item.quantity}</Text>
                  </View>
                  <Switch
                    value={checkedItems[item.id]}
                    onValueChange={() => toggleItemChecked(item.id)}
                  />
                </View>
              ))}
            </View>

            {/* Opmerking veld */}
            <View className="flex-col bg-white p-5 rounded shadow mb-5">
              <Text className="font-bold text-lg mb-2">Opmerking</Text>
              <TextInput
                className="border border-gray-300 rounded p-3 text-base"
                placeholder="Voer een opmerking in..."
                multiline
                value={note}
                onChangeText={setNote}
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Probleem melden knop */}
            <TouchableOpacity
              onPress={handleReportProblem}
              className="bg-red-500 p-4 rounded-xl items-center mb-10"
            >
              <Text className="text-white font-semibold text-lg">Probleem melden</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}