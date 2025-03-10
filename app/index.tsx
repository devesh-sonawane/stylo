import { StatusBar } from "expo-status-bar";
import { Send } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import ChatMessage from "@/components/ChatMessage";
import LoadingIndicator from "@/components/LoadingIndicator";
import {
  FASHION_SYSTEM_PROMPT,
  Message,
  callBackendAPI,
  createSystemMessageWithProducts,
  resetConversation,
  checkBackendHealth,
} from "./services/api";

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Initialize app
  useEffect(() => {
    const initialize = async () => {
      // Check if backend is available
      try {
        const isHealthy = await checkBackendHealth();
        setBackendAvailable(isHealthy);

        if (!isHealthy) {
          throw new Error("Backend health check failed");
        }
      } catch (error) {
        console.error("Backend not available:", error);
        setBackendAvailable(false);
        Alert.alert(
          "Backend Not Available",
          "The fashion assistant backend is not available. Please make sure the backend server is running.",
          [{ text: "OK" }]
        );
      } finally {
        setIsInitialized(true);
      }
    };

    initialize();
  }, []);

  // Initialize chat with welcome message
  useEffect(() => {
    if (isInitialized) {
      const welcomeMessage: Message = {
        role: "assistant",
        content:
          "Hello! I'm Stylo, your personal fashion assistant. How can I help you with your style today?",
        products: [],
      };
      setMessages([welcomeMessage]);
    }
  }, [isInitialized]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = async () => {
    if (inputText.trim() === "" || isLoading || !backendAvailable) return;

    const userMessage: Message = {
      role: "user",
      content: inputText.trim(),
    };

    // Update UI immediately with user message
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Prepare messages for API call
      const apiMessages: Message[] = [...messages, userMessage];

      // Call Backend API
      const assistantMessage = await callBackendAPI(apiMessages);

      // Add AI response to messages
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Sorry, I'm having trouble connecting to the fashion assistant backend. Please make sure the server is running and try again.",
        products: [],
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetConversation = () => {
    // Reset the conversation in the UI
    const welcomeMessage: Message = {
      role: "assistant",
      content:
        "Conversation has been reset. How can I help you with your style today?",
      products: [],
    };
    setMessages([welcomeMessage]);
  };

  if (!isInitialized) {
    return (
      <LinearGradient colors={["#5988E9", "#DFECF9"]} style={{ flex: 1 }}>
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={{ marginTop: 16, color: "#FFFFFF", fontWeight: "500" }}>
            Connecting to fashion assistant backend...
          </Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#5988E9", "#DFECF9"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <StatusBar style="dark" />

          <Header onResetConversation={handleResetConversation} />

          <View style={{ height: 1, backgroundColor: "#00000015" }} />

          <FlatList
            ref={flatListRef}
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <ChatMessage message={item} />}
            ListFooterComponent={isLoading ? <LoadingIndicator /> : null}
            ListHeaderComponent={
              !backendAvailable ? (
                <View
                  style={{
                    padding: 12,
                    backgroundColor: "#FFF4F4",
                    borderRadius: 8,
                    marginBottom: 16,
                    borderLeftWidth: 4,
                    borderLeftColor: "#FF6B6B",
                  }}
                >
                  <Text style={{ color: "#FF6B6B", fontWeight: "500" }}>
                    Backend server not available. Please make sure the fashion
                    assistant backend is running.
                  </Text>
                </View>
              ) : null
            }
          />

          <View style={{ height: 1, backgroundColor: "#5988E940" }} />

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              borderRadius: 40,
              marginHorizontal: 16,
              marginVertical: 8,
              padding: 8,
            }}
          >
            <TextInput
              placeholder="Ask about fashion advice..."
              style={{ flex: 1, paddingLeft: 16, fontWeight: "500" }}
              placeholderTextColor="#00000050"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
              editable={!isLoading && backendAvailable}
            />

            <TouchableOpacity
              onPress={handleSend}
              disabled={
                inputText.trim() === "" || isLoading || !backendAvailable
              }
              style={{
                padding: 15,
                backgroundColor: "white",
                borderRadius: 40,
                elevation: 8,
                shadowColor: "#5988E9",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                opacity:
                  inputText.trim() === "" || isLoading || !backendAvailable
                    ? 0.5
                    : 1,
              }}
            >
              <Send color="#5988E9" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
