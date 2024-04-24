import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import RNText from "./RNText";
import { Image } from "expo-image";
import { blurhash } from "../constants";
const Story = ({ item }) => {
  return (
    <View
      style={{
        width: wp("17%"),
        height: wp("17%"),
        borderRadius: wp("17%") / 2,
        justifyContent: "center",
        alignItems: "center",
        //add black border
        borderWidth: 2,
        borderColor: "#ff8501",
        marginRight: wp("2%"),
      }}
    >
      <Image
        style={{
          height: hp(7),
          aspectRatio: 1,
          borderRadius: 50,
          backgroundColor: "#0553",
        }}
        source={item.image}
        placeholder={blurhash}
        transition={200}
      />
    </View>
  );
};

export default Story;
