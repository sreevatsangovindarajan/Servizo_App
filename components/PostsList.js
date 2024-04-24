import { Image } from "expo-image";
import React from "react";
import { View, FlatList } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../constants";
import dayjs from "dayjs";
import RNText from "./RNText";
import Timeline from "./Chip";
var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const Item = ({ item }) => {
  const { name, content, date, image, profileImage, stage } = item;
  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 10,
        padding: 7,
      }}
    >
      <View
        style={{
          marginBottom: 10,
          minHeight: 40,
          width: wp(100),
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            height: hp(5),
            aspectRatio: 1,
            borderRadius: 50,
            backgroundColor: "#0553",
          }}
          source={profileImage}
          placeholder={blurhash}
          transition={200}
        />
        <View
          style={{
            marginLeft: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RNText font={"U-Bold"}>{name} </RNText>
              <RNText
                font={"U-Bold"}
                style={{
                  color: "#9ca3af",

                  marginTop: -2,
                  marginLeft: 3,
                  fontSize: 10.5,
                  lineHeight: 14,
                }}
              >
                · {dayjs(date).fromNow()}
              </RNText>
            </View>

            <RNText
              style={{
                fontFamily: "Poppins-SemiBold",
                marginLeft: 1,
                color: "#9ca3af",
                marginTop: -2,
                fontSize: 12,
              }}
            >
              Location
            </RNText>
          </View>
        </View>
      </View>
      <View
        style={{
          gap: 3,
          position: "relative",
        }}
      >
        <RNText
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 12.25,
            lineHeight: 17.5,
          }}
        >
          {content}
        </RNText>
        <Image
          style={{
            height: hp(30),
            maxWidth: wp(100),
            borderRadius: 4,
            backgroundColor: "#0553",
          }}
          source={image}
          placeholder={blurhash}
          transition={200}
        />
        <View
          style={{
            bottom: 5,
            right: 5,
            position: "absolute",
            zIndex: 30,
          }}
        ></View>
        <Timeline stage={stage} />
      </View>
    </View>
  );
};

const PostList = (props) => {
  return (
    <View
      style={{
        paddingBottom: hp(22),
        padding: 7,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={props.data}
        renderItem={({ item, index }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default PostList;
