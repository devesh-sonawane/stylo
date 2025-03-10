import { Settings, RefreshCw } from "lucide-react-native";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { resetConversation } from "@/app/services/api";

interface HeaderProps {
  onResetConversation?: () => void;
}

export default function Header({ onResetConversation }: HeaderProps) {
  const handleReset = async () => {
    Alert.alert(
      "Reset Conversation",
      "Are you sure you want to reset the conversation?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          onPress: async () => {
            try {
              const success = await resetConversation();
              if (success && onResetConversation) {
                onResetConversation();
              } else {
                Alert.alert("Error", "Failed to reset conversation");
              }
            } catch (error) {
              console.error("Error resetting conversation:", error);
              Alert.alert("Error", "Failed to reset conversation");
            }
          },
        },
      ]
    );
  };

  return (
    <View
      style={{
        flexDirection: "row",
        padding: 16,
        paddingBottom: 8,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          paddingVertical: 15,
          paddingHorizontal: 20,
          borderRadius: 40,
          elevation: 8,
          shadowColor: "#5988E9",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>AI. Stylo</Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={handleReset}
          style={{
            padding: 15,
            backgroundColor: "white",
            borderRadius: 40,
            elevation: 8,
            shadowColor: "#5988E9",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            marginRight: 10,
          }}
        >
          <RefreshCw color="#5988E9" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: "white",
            borderRadius: 40,
            elevation: 8,
            shadowColor: "#5988E9",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
          }}
        >
          <Settings color="#5988E9" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
