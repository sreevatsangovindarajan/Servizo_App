import { View, Pressable, FlatList } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authcontext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Booking from "../(app)/booking";
import RNText from "../../components/RNText";
const NewRequest = () => {
  const { bookings, user } = useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          snapToInterval={wp(100)}
          renderItem={({ item }) => {
            return <Booking item={item} userId={user?.id} />;
          }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <RNText font={"U-Bold"}>You have no bookings</RNText>
        </View>
      )}
    </View>
  );
};

export default NewRequest;
