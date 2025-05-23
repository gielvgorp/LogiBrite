import { useRouter } from "expo-router";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {

  const router = useRouter();
  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-blue-500"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={60} // pas dit aan indien nodig
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center items-center px-10">
          <View className="h-[70%] w-full flex-col justify-between items-center">
            <Image 
              source={require('../assets/images/logo.png')}
              resizeMode="contain" 
              className="h-[205px]"
            />
            <View className="w-full flex-col mt-8">
              <TextInput 
                placeholder="Gebruikersnaam"
                placeholderTextColor="#fff"
                className="border-b border-white text-white p-2 mb-4"
              />
              <TextInput 
                placeholder="Wachtwoord"
                secureTextEntry={true}
                placeholderTextColor="#fff"
                className="border-b border-white text-white p-2"
              />
            </View>
            <View className="w-full flex-row justify-center mt-8">
              <TouchableOpacity className="border border-white rounded p-4 w-64" onPress={() => router.push("/(tabs)/Home")}>
                <Text className="text-center text-white text-lg font-bold">Inloggen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
