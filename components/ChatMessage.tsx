import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import { Message, ProductRecommendation } from "@/app/services/api";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const hasProducts =
    !isUser && message.products && message.products.length > 0;

  const openProductLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Error opening URL:", err)
    );
  };

  // Function to get a valid image URL or return undefined
  const getValidImageUrl = (
    product: ProductRecommendation
  ): string | undefined => {
    // Check if imageUrl exists and is not empty
    if (product.imageUrl && product.imageUrl.trim() !== "") {
      return product.imageUrl;
    }

    // If no valid imageUrl, return undefined
    return undefined;
  };

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.aiContainer,
        hasProducts && styles.aiContainerWithProducts,
      ]}
    >
      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}
      >
        <Text style={styles.messageText}>{message.content}</Text>
      </View>

      {hasProducts && (
        <View style={styles.productsContainer}>
          <Text style={styles.productsTitle}>Recommended Products:</Text>

          <FlatList
            horizontal
            data={message.products}
            renderItem={({ item: product, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.productCard}
                  onPress={() => openProductLink(product.productLink)}
                >
                  {getValidImageUrl(product) ? (
                    <Image
                      source={{ uri: getValidImageUrl(product) }}
                      style={styles.productImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.noImageContainer}>
                      <Text style={styles.noImageText}>No Image</Text>
                    </View>
                  )}
                  {product.category && (
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>
                        {product.category}
                      </Text>
                    </View>
                  )}
                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>
                      {product.name}
                    </Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <View style={styles.colorsContainer}>
                      {product.colors && product.colors.length > 0 ? (
                        <>
                          {product.colors
                            .slice(0, 3)
                            .map((color, colorIndex) => (
                              <Text key={colorIndex} style={styles.colorText}>
                                {color}
                                {colorIndex <
                                Math.min(product.colors.length, 3) - 1
                                  ? ", "
                                  : ""}
                              </Text>
                            ))}
                          {product.colors.length > 3 && (
                            <Text style={styles.colorText}>
                              +{product.colors.length - 3} more
                            </Text>
                          )}
                        </>
                      ) : (
                        <Text style={styles.colorText}>
                          No color information
                        </Text>
                      )}
                    </View>
                    <TouchableOpacity
                      style={styles.buyButton}
                      onPress={() => openProductLink(product.productLink)}
                    >
                      <Text style={styles.buyButtonText}>Buy Now</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    maxWidth: "80%",
  },
  userContainer: {
    alignSelf: "flex-end",
  },
  aiContainer: {
    // alignSelf: "flex-start",
  },
  aiContainerWithProducts: {
    maxWidth: "95%",
  },
  bubble: {
    padding: 16,
    borderRadius: 12,
    shadowColor: "#5988E9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: "white",
    borderBottomRightRadius: 0,
  },
  aiBubble: {
    backgroundColor: "#E3EDFC",
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  productsContainer: {
    marginTop: 12,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#5988E9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  productsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#5988E9",
  },
  productsScrollView: {
    // flexDirection: "row",
  },
  productCard: {
    width: 180,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: "#F8FAFD",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E3EDFC",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 180,
    backgroundColor: "#F0F4F9",
  },
  noImageContainer: {
    width: "100%",
    height: 180,
    backgroundColor: "#F0F4F9",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#8FA3BF",
    fontWeight: "500",
  },
  categoryBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(89, 136, 233, 0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5988E9",
    marginBottom: 4,
  },
  colorsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  colorText: {
    fontSize: 12,
    color: "#8FA3BF",
  },
  buyButton: {
    backgroundColor: "#5988E9",
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 4,
  },
  buyButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
});
