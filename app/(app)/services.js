import { View, FlatList } from "react-native";
import React, { useContext, useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { AuthContext } from "../../context/authcontext";
import ServiceComponent from "../../components/ServiceComponent";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const services = () => {
  const { categoryName } = useLocalSearchParams();
  const { services } = useContext(AuthContext);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: categoryName + " Services",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontFamily: "Poppins-Bold",
      },
    });
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <FlatList
        data={services.filter((item) => item.category === categoryName)}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        snapToInterval={wp(100)}
        renderItem={({ item }) => {
          return <ServiceComponent item={item} />;
        }}
      />
    </View>
  );
};

export default services;
