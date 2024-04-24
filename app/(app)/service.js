import { View, Platform, Pressable, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash } from "../../constants";
import RNText from "../../components/RNText";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { addToLikedList, removeFromLiked } from "../../constants/api";
import { AuthContext } from "../../context/authcontext";

const service = () => {
  const { serviceId } = useLocalSearchParams();
  const { user, updateLikedList, services } = useContext(AuthContext);
  const id = parseInt(serviceId);

  const { image, name, price, rating, numReviews, description, liked } =
    services.find((item) => item.id === id);
  const [isLiked, setIsLiked] = useState(liked);
  const handleLiked = () => {
    if (isLiked) {
      removeFromLiked(id, user.id);
      updateLikedList(id, false);
    } else {
      addToLikedList(id, user.id);
      updateLikedList(id, true);
    }
    setIsLiked(!isLiked);
  };

  // here isLiked is a string of "true" or "false" so we need to convert it to boolean
  return (
    <ScrollView
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 40,
          left: 20,
          zIndex: 3,
          backgroundColor: "#00000060",
          width: 40,
          height: 40,
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons
          name={"arrow-back"}
          size={32}
          color={"white"}
          onPress={() => router.back()}
        />
      </View>

      <Image
        style={{
          width: wp(100),
          aspectRatio: 1,
        }}
        source={image}
        placeholder={blurhash}
        transition={500}
      />
      <View
        style={{
          padding: wp(5),
          position: "relative",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <RNText
            style={{
              fontSize: 26.25,
              lineHeight: 31.5,
              flex: 1,
            }}
            font={"U-Bold"}
          >
            {name}
          </RNText>
          <MaterialIcons
            name={isLiked ? "favorite" : "favorite-border"}
            size={32}
            color={Colors.primary}
            // style={{
            //   position: "absolute",
            //   top: 25,
            //   right: 20,
            //   zIndex: 3,
            // }}
            onPress={handleLiked}
          />
        </View>

        <RNText
          style={{
            marginTop: 5,
            color: Colors.primary,
            fontSize: 26.25,
            lineHeight: 31.5,
          }}
          font={"U-Bold"}
        >
          ${price}
        </RNText>

        <RNText
          style={{
            marginTop: 5,
            color: Colors.mediumGray,
            fontSize: 15.75,
            lineHeight: 24.5,
            marginBottom: 3.5,
          }}
          font={"U-Bold"}
        >
          <FontAwesome name="star" size={16} color={Colors.yellow} /> {rating} |
          ({numReviews} Reviews)
        </RNText>
        <RNText
          font={"U-Medium"}
          style={{
            fontSize: 15.75,
            lineHeight: 24.5,
            marginVertical: 7,
          }}
        >
          {description}
        </RNText>

        <Pressable
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 999,
            marginVertical: 7,
          }}
          onPress={() => {
            router.push({
              pathname: "book",
              params: {
                serviceId,
                name,
                price,
                image,
                rating,
                numReviews,
                description,
              },
            });
          }}
        >
          <RNText
            style={{
              fontSize: hp(2.5),
              color: "#fff",
              padding: 3.5 * 2.5,
              borderRadius: 5,
              marginVertical: 3.5,
              textAlign: "center",
            }}
            font={"U-Bold"}
          >
            Book Now
          </RNText>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default service;
