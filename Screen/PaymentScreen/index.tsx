import React, { useState } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { createTransaction } from "../../service/PaymentService";
import { NavigationProp } from '@react-navigation/native';

const PaymentScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const data = {
        orderId: `ORDER-${Date.now()}`,
        grossAmount: 100000,
        customerDetails: {
          name: "John Doe",
          email: "johndoe@example.com",
          phone: "08123456789",
        },
      };

      const response = await createTransaction(data);
      if (response?.transaction?.redirect_url) {
        setPaymentUrl(response.transaction.redirect_url);
      } else {
        Alert.alert("Error", "Failed to initiate payment.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong.";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    const { url } = navState;

    console.log("Navigating to:", url);

    if (url.includes("status=success")) {
      Alert.alert("Success", "Payment Successful!");
      navigation.navigate("SuccessScreen");
    } else if (url.includes("status=failed")) {
      Alert.alert("Failed", "Payment Failed.");
      navigation.goBack();
    } else if (url.includes("status=pending")) {
      Alert.alert("Pending", "Payment is pending confirmation.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {paymentUrl ? (
        <WebView
          source={{ uri: paymentUrl }}
          onNavigationStateChange={handleNavigationStateChange}
          style={{ flex: 1 }}
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Start Payment</Text>
          <Button
            title={loading ? "Processing..." : "Pay Now"}
            onPress={handlePayment}
            disabled={loading}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, marginBottom: 16 },
});

export default PaymentScreen;
