// Define message types
export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  products?: ProductRecommendation[];
}

export interface ProductRecommendation {
  name: string;
  price: string;
  colors: string[];
  productLink: string;
  imageUrl: string;
  category?: string;
}

import { getBackendApiUrl } from "../utils/env";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Get the backend API URL
const BACKEND_API_URL = getBackendApiUrl();

// Custom backend API interface
export const callBackendAPI = async (messages: Message[]): Promise<Message> => {
  try {
    // Extract the user query from the last user message
    const userQuery =
      messages.filter((msg) => msg.role === "user").pop()?.content || "";

    // Get session ID from AsyncStorage if available (for conversation continuity)
    let sessionId;
    try {
      sessionId = await AsyncStorage.getItem("fashion_assistant_session_id");
    } catch (error) {
      console.error("Error accessing AsyncStorage:", error);
      sessionId = undefined;
    }

    const response = await fetch(`${BACKEND_API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: userQuery,
        session_id: sessionId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Backend API error: ${errorData.error || response.statusText}`
      );
    }

    const data = await response.json();

    // Save the session ID for future requests
    if (data.session_id) {
      try {
        await AsyncStorage.setItem(
          "fashion_assistant_session_id",
          data.session_id
        );
      } catch (error) {
        console.error("Error saving to AsyncStorage:", error);
      }
    }

    // Process products from the new response format
    const products: ProductRecommendation[] = (data.products || []).map(
      (product: any) => {
        return {
          name: product.name || "Product",
          price: product.price || "Price not available",
          colors: product.colors ? product.colors.split(", ") : [],
          productLink: product.product_link || "",
          imageUrl: product.image_url || "",
          category: product.category || "",
        };
      }
    );

    return {
      role: "assistant",
      content: data.response,
      products: products,
    };
  } catch (error) {
    console.error("Error calling backend API:", error);
    throw error;
  }
};

// Reset the conversation session
export const resetConversation = async (): Promise<boolean> => {
  try {
    // Get the current session ID
    let sessionId;
    try {
      sessionId = await AsyncStorage.getItem("fashion_assistant_session_id");
    } catch (error) {
      console.error("Error accessing AsyncStorage:", error);
      return false;
    }

    if (!sessionId) {
      // No session to reset
      return true;
    }

    const response = await fetch(`${BACKEND_API_URL}/api/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: sessionId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Backend API error: ${errorData.error || response.statusText}`
      );
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error resetting conversation:", error);
    return false;
  }
};

// Check if the backend is available
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/health`);
    return response.ok;
  } catch (error) {
    console.error("Backend health check failed:", error);
    return false;
  }
};

// Fashion AI system prompt - kept for reference but not used with backend API
export const FASHION_SYSTEM_PROMPT = `You are Stylo, a helpful and knowledgeable fashion assistant. 
You provide personalized fashion advice, outfit recommendations, and style tips based on users' preferences, body types, occasions, and current fashion trends.
Your expertise includes:
- Personal styling and outfit coordination
- Fashion trends and seasonal recommendations
- Body type-specific clothing recommendations
- Color theory and palette suggestions
- Wardrobe essentials and capsule wardrobe building
- Sustainable and ethical fashion options
- Occasion-specific outfit planning (formal, casual, business, etc.)
- Accessory pairing and styling tips

You have access to a catalog of H&M products that you can recommend to users.
When appropriate, recommend specific products from the catalog that match the user's needs.`;

// This function is kept for backward compatibility but doesn't affect the backend API
export const createSystemMessageWithProducts = (
  productsData: string
): Message => {
  return {
    role: "system",
    content: FASHION_SYSTEM_PROMPT,
  };
};
