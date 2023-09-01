import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../user/Onboarding";
import SignIn from "../user/SignIn";
import SignUp from "../user/SignUp";
import LandOnboard from "../user/LandOnborad";
import ForgotPassWord from "../user/ForgotPassWord";
import Verify from "../user/Verify";
import CreatePassword from "../user/CreatePassword";


const Stack = createNativeStackNavigator();
const UserNavigation = () => {
  return (
    <Stack.Navigator
      headerModal="non"
      screenOptions={{ headerStyle: { backgroundColor: "#FFFFFFF" } }}
    >
      <Stack.Screen
        name="Onbording"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WelcomeScreen"
        component={LandOnboard}
        options={{ headerShown: false }}
      />
     <Stack.Screen
        name="ForgotScreen"
        component={ForgotPassWord}
        options={{ headerShown: false }}
      />
           <Stack.Screen
        name="VerifyScreen"
        component={Verify}
        options={{ headerShown: false }}
      />
     <Stack.Screen
        name="PasswordScreen"
        component={CreatePassword}
        options={{ headerShown: false }}
      />
     {/*  <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default UserNavigation;
