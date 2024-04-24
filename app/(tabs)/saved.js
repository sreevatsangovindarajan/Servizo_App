import { View, FlatList } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authcontext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ServiceComponent from "../../components/ServiceComponent";
import RNText from "../../components/RNText";
const Saved = () => {
  const { services } = useContext(AuthContext);

  const filtered_services = services.filter((item) => item.liked);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {filtered_services.length > 0 ? (
        <FlatList
          data={filtered_services}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          snapToInterval={wp(100)}
          renderItem={({ item }) => {
            return <ServiceComponent item={item} showLike />;
          }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <RNText font={"U-Bold"}>You have no saved</RNText>
        </View>
      )}
    </View>
  );
};

export default Saved;
