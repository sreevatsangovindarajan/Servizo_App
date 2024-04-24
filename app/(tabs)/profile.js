import React, { useContext, useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { blurhash } from "../../constants";
import RNText from "../../components/RNText";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AuthContext } from "../../context/authcontext";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import ProfileImage from "../../components/ProflieImage";
import { Link } from "expo-router";
const Profile = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const [updateImage, setUpdateImage] = useState(false);

  const upateProfile = (url) => {
    setUpdateImage(false);

    setUser((user) => {
      return { ...user, profileUrl: url };
    });
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          paddingTop: 24,
          backgroundColor: Colors.primary,
          paddingBottom: 24,
          paddingHorizontal: 14,
        }}
      >
        {updateImage === false ? (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginVertical: 14,
                position: "relative",
              }}
            >
              <Image
                style={{
                  height: hp(18),
                  aspectRatio: 1,
                  borderRadius: 10,
                  backgroundColor: "#0553",
                  // borderRadius: hp(6.5) / 2,
                }}
                source={
                  user?.profileUrl
                    ? user?.profileUrl
                    : "https://picsum.photos/seed/696/3000/2000"
                }
                placeholder={blurhash}
                transition={500}
              />
              <Pressable
                onPress={() => setUpdateImage(true)}
                style={{
                  position: "absolute",
                  right: hp(20),
                  top: -15,
                  backgroundColor: "#fff",
                  padding: 8,
                  borderRadius: 50,
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="edit" size={24} color={Colors.primary} />
              </Pressable>
            </View>
          </>
        ) : (
          <View
            style={{
              minHeight: hp(35),
              paddingBottom: 20,
            }}
          >
            <ProfileImage id={user.id} upateProfile={upateProfile} />
          </View>
        )}
        <RNText
          style={{
            fontSize: 31.5,
            lineHeight: 35,
            textAlign: "center",
            color: "#fff",
          }}
          font={"U-Bold"}
        >
          {user?.username}
        </RNText>
        <RNText
          style={{
            textAlign: "center",
            color: "#fff",
          }}
          font={"U-Bold"}
        >
          {user?.email}
        </RNText>
      </View>
      <View
        style={{
          alignSelf: "center",
          gap: 24,
          marginTop: -50,
          marginBottom: 14,
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3.5,
          }}
        >
          <Entypo name="home" size={24} color={Colors.primary} />
          <Link
            href={"/home"}
            style={{
              fontSize: 21,
              lineHeight: 28,
            }}
            font={"U-Bold"}
          >
            <RNText
              style={{
                fontSize: 21,
                lineHeight: 28,
              }}
              font={"U-Bold"}
            >
              Home
            </RNText>
          </Link>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3.5,
          }}
        >
          <FontAwesome5 name="book" size={24} color={Colors.primary} />

          <Link
            href={"/bookings"}
            style={{
              fontSize: 21,
              lineHeight: 28,
            }}
            font={"U-Bold"}
          >
            <RNText
              style={{
                fontSize: 21,
                lineHeight: 28,
              }}
              font={"U-Bold"}
            >
              Bookings
            </RNText>
          </Link>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3.5,
          }}
        >
          <MaterialIcons name="help" size={24} color={Colors.primary} />
          <RNText
            style={{
              fontSize: 21,
              lineHeight: 28,
            }}
            font={"U-Bold"}
          >
            Contact Us
          </RNText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3.5,
          }}
        >
          <MaterialIcons name="logout" size={24} color={Colors.primary} />

          <TouchableOpacity onPress={logout}>
            <RNText
              style={{
                fontSize: 21,
                lineHeight: 28,
              }}
              font={"U-Bold"}
            >
              Logout
            </RNText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Profile;
