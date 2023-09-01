import { StatusBar } from "expo-status-bar";
import { StyleSheet, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./screens/navigation/MainNavigation";
import { MessageProvider } from "./screens/utils/MessageContext";
import { Updates } from "expo";
import React from "react";
// import Toast from "react-native-toast-message"; // Import Toast
// import Header from "./screens/utils/Header";
LogBox.ignoreAllLogs();

 export default function App() {
//   useEffect(() => {
//     async function checkForUpdates() {
//       const { isAvailable } = await Updates.checkForUpdateAsync();
//       if (isAvailable) {
//         // Show a toast notification
//         Toast.show({
//           type: "info",
//           text1: "Update Available",
//           text2: "A new update is available. Restart to apply.",
//           visibilityTime: 5000, // Display time in milliseconds
//         });

//         // Handle the update
//         handleUpdate();
//       }
//     }

//     checkForUpdates();
//   }, []);

//   async function handleUpdate() {
//     try {
//       // Fetch and apply the update
//       const { isNew } = await Updates.fetchUpdateAsync();
//       if (isNew) {
//         // Inform the user and suggest a restart
//         Updates.reloadAsync();
//       }
//     } catch (error) {
//       // Handle error
//       console.error("Error while handling update:", error);
//     }
//   }

  return (
      <MessageProvider>
    <NavigationContainer>
        <StatusBar style="auto" />
        {/* <Header /> */}

        <MainNavigation />
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> Toast component */}
    </NavigationContainer>
      </MessageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
