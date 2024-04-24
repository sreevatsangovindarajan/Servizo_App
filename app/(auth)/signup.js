import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../../components/Loading";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import WelcomeImg from "../../assets/svg/welcome";

import { AuthContext } from "../../context/authcontext";
import { useRouter } from "expo-router";
import CustomKeyboardView from "../../components/CustomKeybordView";
import RNText from "../../components/RNText";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SvgXml } from "react-native-svg";
import Colors from "../../constants/Colors";

const SignUp = () => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [hidePassword, setHidePassword] = useState(true);

  const handleSignIn = async () => {
    if (email === "" || password === "") {
      Alert.alert("SignUp", "Email and Password are required");
      return;
    }

    setLoading(true);

    let response = await register(email, password);

    setLoading(false);
    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <View
        style={{
          paddingTop: hp(6),
          paddingHorizontal: wp(5),
          flex: 1,
        }}
      >
        <View
          style={{
            alignItems: "center",

            marginBottom: 14,
          }}
        >
          <SvgXml key={`logo`} xml={WelcomeImg} width={200} height={200} />
        </View>

        <RNText
          style={{
            fontSize: 26.25,
            lineHeight: 31.5,
            textAlign: "center",
          }}
          font={"U-Bold"}
        >
          Register and let's make awesome changes to your home
        </RNText>
        <View
          style={{
            flex: 1,
            gap: 4,
          }}
        >
          <RNText font="U-Bold">Email</RNText>
          <TextInput
            value={email}
            style={{
              borderWidth: 2,
              borderColor: "#D1D5DB",
              borderRadius: 6,
              padding: 7,
              width: "100%",
            }}
            onChangeText={setEmail}
          />
          <RNText font="U-Bold">Password</RNText>

          <View
            style={{
              position: "relative",
            }}
          >
            <TextInput
              secureTextEntry={hidePassword ? true : false}
              style={{
                borderWidth: 2,
                borderColor: "#D1D5DB",
                borderRadius: 6,
                padding: 7,
                width: "100%",
              }}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              onPress={() => {
                setHidePassword(!hidePassword);
              }}
              style={{
                position: "absolute",
                right: 15,
                top: 12,
                zIndex: 10,
              }}
            >
              {hidePassword ? (
                <AntDesign name="eye" size={20} color="black" />
              ) : (
                <FontAwesome name="eye-slash" size={20} color="black" />
              )}
            </Pressable>
          </View>
          <View
            style={{
              paddingHorizontal: 3.5,
              marginVertical: 7,
            }}
          >
            <BouncyCheckbox
              size={22}
              unfillColor="#ddd"
              fillColor={Colors.primary}
              text="Remember me"
              innerIconStyle={{ borderWidth: 1.5, borderColor: "transparent" }}
              textStyle={{
                fontFamily: "U-Regular",
                textDecorationLine: "none",
                fontSize: hp(1.8),
              }}
              iconStyle={{
                borderRadius: 5,
                borderColor: "#bbb",
              }}
            />
          </View>
          <View
            style={{
              marginBottom: 3.5,
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
              <Pressable
                onPress={handleSignIn}
                style={{ backgroundColor: Colors.primary, borderRadius: 999 }}
              >
                <RNText
                  style={{
                    fontSize: hp(2.2),
                    color: "#fff",
                    padding: 7,
                    borderRadius: 5,
                    textAlign: "center",
                  }}
                  font={"U-Bold"}
                >
                  Sign Up
                </RNText>
              </Pressable>
            )}
          </View>

          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <RNText style={{ color: "#6B7280" }}>
              Already have an account?{" "}
            </RNText>
            <TouchableOpacity
              onPress={() => {
                router.replace("/signin");
              }}
            >
              <RNText style={{ color: Colors.primary }} font={"U-Bold"}>
                Sign In
              </RNText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SignUp;
