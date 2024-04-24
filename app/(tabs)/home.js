import {
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authcontext";
import RNText from "../../components/RNText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash, services } from "../../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import ServiceComponent from "../../components/ServiceComponent";
import { router } from "expo-router";
const ios = Platform.OS === "ios";
const sliders = [
  {
    id: 1,
    image:
      "https://firebasestorage.googleapis.com/v0/b/homehub-connect-2a4a4.appspot.com/o/Slider1.png?alt=media&token=04472e00-72d9-40f0-862c-e8c6e2d081e1",
  },
  {
    id: 2,
    image:
      "https://firebasestorage.googleapis.com/v0/b/homehub-connect-2a4a4.appspot.com/o/Slider.png?alt=media&token=fb9110b3-d705-489b-8d5d-417f0e173ea8",
  },
];

const Home = () => {
  const { top } = useSafeAreaInsets();
  const { user, services: allServices } = useContext(AuthContext);
  const [seeALl, setSeeALl] = useState(false);
  const mostPopular = allServices?.filter((item) => item.mostPopular);
  const [search, setSearch] = useState("");

  const searchServices =
    search !== ""
      ? allServices.filter((item) => {
          return (
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
          );
        })
      : [];
  return (
    <ScrollView
      style={{
        paddingTop: ios ? top : top + 10,
        paddingHorizontal: 10,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Image
          style={{
            height: hp(6.5),
            aspectRatio: 1,
            borderRadius: hp(6.5) / 2,
          }}
          source={
            user?.profileUrl
              ? user.profileUrl
              : "https://cdn3d.iconscout.com/3d/premium/thumb/user-6132700-5043877.png"
          }
          placeholder={blurhash}
          transition={500}
        />
        <View>
          <RNText
            style={{
              // color: "#a3a3a3",
              color: Colors.mediumGray,
            }}
            font={"U-Bold"}
          >
            Good Morning 👋🏻
          </RNText>
          <RNText
            style={{
              fontSize: 17.5,
              lineHeight: 24.5,
            }}
            font={"U-Bold"}
          >
            {user.username}
          </RNText>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={{
            fontSize: 16,
            color: Colors.mediumGray,
            fontFamily: "U-Medium",
            backgroundColor: Colors.lightGray,
            borderRadius: 10,
            padding: 10,
            paddingLeft: 15,
            flex: 1,
            marginRight: 10,
          }}
          placeholder="Search"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGray,
            padding: 10,
            borderRadius: 10,
            backgroundColor: Colors.lightGray,
          }}
          onPress={() => {
            setSearch("");
          }}
        >
          <FontAwesome
            name={search === "" ? "search" : "times"}
            size={22}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>

      {search === "" ? (
        <>
          <View>
            <RNText
              style={{
                marginLeft: 5,
                fontSize: 17.5,
                lineHeight: 24.5,
              }}
              font={"U-ExtraBold"}
            >
              Special Offers
            </RNText>

            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                flexDirection: "row",
              }}
            >
              <FlatList
                data={sliders}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                snapToInterval={wp(100)}
                renderItem={({ item }) => {
                  return (
                    <View style={{}}>
                      <Image
                        style={{
                          width: wp(92),
                          height: 150,
                          borderRadius: 20,
                          objectFit: "contain",
                          marginHorizontal: 5,
                        }}
                        source={item.image}
                        placeholder={blurhash}
                        transition={500}
                      />
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <RNText
                style={{
                  marginLeft: 5,
                  fontSize: 17.5,
                  lineHeight: 24.5,
                }}
                font={"U-ExtraBold"}
              >
                Services
              </RNText>
              <Pressable onPress={() => setSeeALl(!seeALl)}>
                <RNText
                  style={{
                    marginLeft: 5,
                    color: Colors.primary,
                  }}
                  font={"U-ExtraBold"}
                >
                  {seeALl ? "See Less" : "See All"}
                </RNText>
              </Pressable>
            </View>

            <View
              style={{
                marginTop: 5,
                marginBottom: 10,
                flexDirection: "row",
                flexWrap: "wrap",
                columnGap: 10,
              }}
            >
              {services
                .slice(0, seeALl ? services.length : 8)
                .map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        router.push({
                          pathname: "services",
                          params: {
                            categoryName: item.name,
                          },
                        });
                      }}
                      key={index}
                      style={{
                        margin: wp(2),
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{
                          width: wp(68) / 4,
                          aspectRatio: 1,
                        }}
                        source={item.icon}
                      />
                      <RNText
                        font={"U-ExtraBold"}
                        style={{ marginTop: 8, fontSize: 14 }}
                      >
                        {item.name}
                      </RNText>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
          <View>
            <RNText
              style={{
                marginLeft: 5,
                fontSize: 17.5,
                lineHeight: 24.5,
              }}
              font={"U-ExtraBold"}
            >
              Most Popular Services
            </RNText>

            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                flexDirection: "row",
                paddingBottom: hp(6),
              }}
            >
              <FlatList
                data={mostPopular}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                snapToInterval={wp(100)}
                renderItem={({ item }) => {
                  return <ServiceComponent item={item} />;
                }}
              />
            </View>
          </View>
        </>
      ) : (
        <>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <RNText
                style={{
                  marginLeft: 5,
                  fontSize: 17.5,
                  lineHeight: 24.5,
                }}
                font={"U-ExtraBold"}
              >
                Results for "{search}"
              </RNText>

              <RNText
                style={{
                  marginLeft: 5,
                  color: Colors.primary,
                  fontSize: 17.5,
                  lineHeight: 24.5,
                }}
                font={"U-ExtraBold"}
              >
                {searchServices.length} found
              </RNText>
            </View>

            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                paddingBottom: hp(6),
              }}
            >
              {searchServices.length > 0 ? (
                <>
                  {searchServices.map((item, index) => {
                    return <ServiceComponent item={item} key={index} />;
                  })}
                </>
              ) : (
                <RNText
                  style={{
                    marginLeft: 5,
                    color: Colors.mediumGray,
                    fontSize: 21,
                    lineHeight: 28,
                  }}
                  font={"U-Bold"}
                >
                  No results found
                </RNText>
              )}
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};
export default Home;
