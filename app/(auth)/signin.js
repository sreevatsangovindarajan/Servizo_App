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
import { SvgXml } from "react-native-svg";
import SignUpImg from "../../assets/svg/signup";
import Loading from "../../components/Loading";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../../context/authcontext";
import { useRouter } from "expo-router";
import CustomKeyboardView from "../../components/CustomKeybordView";
import RNText from "../../components/RNText";
import Colors from "../../constants/Colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
const SignIn = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [hidePassword, setHidePassword] = useState(true);

  const handleSignIn = async () => {
    if (email === "" || password === "") {
      Alert.alert("Sign In", "Email and Password are required");
      return;
    }

    setLoading(true);

    let response = await login(email, password);

    setLoading(false);
    if (!response.success) {
      Alert.alert("SignIn", response.msg);
    }

    // Implement your sign-in logic here
  };

  return (
    <CustomKeyboardView>
      <View
        style={{
          paddingTop: hp(8),
          paddingHorizontal: wp(5),
          flex: 1,
          gap: 8,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <SvgXml key={`logo`} xml={SignUpImg} width={200} height={200} />
        </View>

        <RNText
          style={{
            fontSize: 31.5,
            lineHeight: 35,
            textAlign: "left",
          }}
          font={"U-Bold"}
        >
          Login to your Account
        </RNText>
        <View
          style={{
            flex: 1,
            gap: 4,
          }}
        >
          <RNText font={"U-Bold"}>Email</RNText>
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
          <RNText font={"U-Bold"}>Password</RNText>

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
                router.replace("/forgotpassword");
              }}
            >
              <RNText
                style={{
                  textAlign: "right",
                  fontWeight: "medium",
                  marginVertical: 1.5 * 3.5,
                }}
              >
                Forgot password?
              </RNText>
            </Pressable>
            <Pressable
              onPress={() => {
                setHidePassword(!hidePassword);
              }}
              style={{
                position: "absolute",
                right: 15,
                top: 13,
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
              marginTop: -5 * 3.5,
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
              marginVertical: 7,
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
                style={{
                  backgroundColor: Colors.primary,
                  borderRadius: 999,
                }}
                onPress={handleSignIn}
              >
                <RNText
                  style={{
                    fontSize: hp(2),
                    color: "#fff",
                    padding: 7,
                    borderRadius: 5,
                    textAlign: "center",
                  }}
                  font={"U-Bold"}
                >
                  Sign In
                </RNText>
              </Pressable>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RNText style={{ color: "#6B7280" }}>
              Don't have an account?{" "}
            </RNText>
            <TouchableOpacity
              onPress={() => {
                router.replace("/signup");
              }}
            >
              <RNText style={{ color: Colors.primary }} font={"U-Bold"}>
                Sign Up
              </RNText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SignIn;
