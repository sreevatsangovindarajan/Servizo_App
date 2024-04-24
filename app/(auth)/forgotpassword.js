import React, { useContext, useState } from "react";
import { View, TextInput, Button, Alert, Pressable, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SvgXml } from "react-native-svg";
import loginImg from "../../assets/svg/password";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/authcontext";
import { useRouter } from "expo-router";
import RNText from "../../components/RNText";
import Colors from "../../constants/Colors";
const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useContext(AuthContext);
  const router = useRouter();
  const handleResetPassword = async () => {
    // check for email validation
    if (
      email === "" ||
      !email.includes("@") ||
      !email.includes(".") ||
      email.length < 5
    ) {
      Alert.alert("Reset Password", "Please enter a valid email address");
      return;
    }
    setLoading(true);
    const status = await resetPassword(email);
    setLoading(false);

    if (status.success) {
      Alert.alert(
        "Password Reset Email Sent",
        "Please check your email to reset your password.",
        [
          {
            text: "Go to Sign In",
            onPress: () => router.replace("/signin"),
          },
        ]
      );
    } else {
      Alert.alert("Reset Password", status.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          paddingTop: hp(8),
          paddingHorizontal: wp(5),
          flex: 1,
          gap: 4,
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginBottom: 4 * 3.5,
          }}
        >
          <SvgXml key={`logo`} xml={loginImg} width={200} height={200} />
        </View>

        <RNText
          style={{
            fontSize: 31.5,
            lineHeight: 35,
            textAlign: "left",
          }}
          font={"U-Bold"}
        >
          Forgot Password
        </RNText>
        <RNText font={"U-Bold"}>Email</RNText>
        <TextInput
          style={{
            borderWidth: 2,
            borderColor: "#D1D5DB",
            borderRadius: 6,
            padding: 7,
            width: "100%",
          }}
          value={email}
          onChangeText={setEmail}
        />
        <RNText font={"U-Medium"}>
          Enter your registered email to receive a link to reset your password
        </RNText>
        <View
          style={{
            marginVertical: 14,
          }}
        >
          {loading ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Loading size={hp(6.5)} />
            </View>
          ) : (
            <>
              <Pressable
                onPress={handleResetPassword}
                style={{ backgroundColor: Colors.primary, borderRadius: 5 }}
              >
                <RNText
                  style={{
                    fontSize: hp(2.5),
                    color: "#fff",
                    padding: 7,
                    borderRadius: 5,
                    textAlign: "center",
                  }}
                  font={"U-Bold"}
                >
                  Continue
                </RNText>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: "#222831",
                  borderRadius: 5,
                  marginTop: 14,
                }}
                onPress={() => {
                  router.replace("/signin");
                }}
              >
                <RNText
                  style={{
                    fontSize: hp(2.5),
                    color: "#fff",
                    padding: 7,
                    borderRadius: 5,
                    textAlign: "center",
                  }}
                  font={"U-Bold"}
                >
                  Back
                </RNText>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
