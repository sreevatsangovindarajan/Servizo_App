import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import RNText from "../../components/RNText";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Colors from "../../constants/Colors";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import Loading from "../../components/Loading";
import dayjs from "dayjs";
import { addBooking } from "../../constants/api";
import { AuthContext } from "../../context/authcontext";
const timeList = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
];
const agents = [
  {
    name: "Sampson Cunningham",
    email: "Sampson.Cunningham@gmail.com",
  },
  {
    name: "Dorsey Casey",
    email: "Dorsey.Casey@gmail.com",
  },
  {
    name: "Janna Mcpherson",
    email: "Janna.Mcpherson@gmail.com",
  },
  {
    name: "Jolene Vargas",
    email: "Jolene.Vargas@gmail.com",
  },
  {
    name: "Tabitha Riddle",
    email: "Tabitha.Riddle@gmail.com",
  },
  {
    name: "Wong Wilkinson",
    email: "Wong.Wilkinson@gmail.com",
  },
  {
    name: "Witt Dunlap",
    email: "Witt.Dunlap@gmail.com",
  },
  {
    name: "Romero Blair",
    email: "Romero.Blair@gmail.com",
  },
  {
    name: "Lilly Fernandez",
    email: "Lilly.Fernandez@gmail.com",
  },
  {
    name: "Keisha Mayer",
    email: "Keisha.Mayer@gmail.com",
  },
  {
    name: "Marcia Davenport",
    email: "Marcia.Davenport@gmail.com",
  },
  {
    name: "Benton Hunt",
    email: "Benton.Hunt@gmail.com",
  },
  {
    name: "Mcknight Hobbs",
    email: "Mcknight.Hobbs@gmail.com",
  },
  {
    name: "Glenda Whitfield",
    email: "Glenda.Whitfield@gmail.com",
  },
  {
    name: "Leonard Barry",
    email: "Leonard.Barry@gmail.com",
  },
  {
    name: "Lyons Atkins",
    email: "Lyons.Atkins@gmail.com",
  },
  {
    name: "Dorthy Wood",
    email: "Dorthy.Wood@gmail.com",
  },
  {
    name: "Mari Donaldson",
    email: "Mari.Donaldson@gmail.com",
  },
  {
    name: "Toni Black",
    email: "Toni.Black@gmail.com",
  },
  {
    name: "Molly Owen",
    email: "Molly.Owen@gmail.com",
  },
  {
    name: "Puckett Lowe",
    email: "Puckett.Lowe@gmail.com",
  },
  {
    name: "Hammond Nash",
    email: "Hammond.Nash@gmail.com",
  },
  {
    name: "Latasha Kemp",
    email: "Latasha.Kemp@gmail.com",
  },
  {
    name: "Robbins Steele",
    email: "Robbins.Steele@gmail.com",
  },
  {
    name: "Paul Berg",
    email: "Paul.Berg@gmail.com",
  },
  {
    name: "Lott Holder",
    email: "Lott.Holder@gmail.com",
  },
  {
    name: "Mavis Mcknight",
    email: "Mavis.Mcknight@gmail.com",
  },
];
const Book = () => {
  const { serviceId, name, price, image, rating, numReviews, description } =
    useLocalSearchParams();
  const { user } = useContext(AuthContext);
  const [selected, setSelected] = useState("");
  const [timeSelected, setTimeSelected] = useState("");

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: "Book " + name,
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontFamily: "Poppins-Bold",
      },
    });
  }, [navigation]);

  const getTime = () => {
    let time = [];
    const currentDate = new Date();
    // const currentHour = currentDate.getHours();
    const currentHour = 22;
    if (
      selected === currentDate.toISOString().split("T")[0] &&
      currentHour >= 8
    ) {
      time = timeList.slice(currentHour - 7);
    } else {
      time = timeList;
    }

    return time;
  };
  const slots = getTime();

  // create a array of users with 100 names

  const handleBooking = async () => {
    setLoading(true);
    const booking = {
      serviceId: parseInt(serviceId),
      date: `${dayjs(selected).format("ddd, MMM DD, YYYY")} | ${timeSelected}`,
      price: price,
      image,
      rating,
      numReviews,
      description,
      name,
      status: "Booked",
      agent: agents[Math.floor(Math.random() * agents.length)],
    };
    try {
      await addBooking(booking, user.id);
      Alert.alert("Success", "Booking Successful for " + name, [
        {
          text: "OK",
          onPress: () => {
            router.push("/home");
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Something went wrong, please try again", [
        {
          text: "OK",
          onPress: () => {
            router.back();
          },
        },
      ]);
    }
    setLoading(false);
  };
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: "#fff",
        gap: 3,
        flex: 1,
      }}
    >
      <RNText
        font={"U-Bold"}
        style={{
          fontSize: 21,
          lineHeight: 28,
          textAlign: "center",
          marginBottom: 3.5,
        }}
      >
        Select Date
      </RNText>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        style={{
          borderRadius: 20,
          paddingBottom: 10,
        }}
        theme={{
          textSectionTitleColor: "#000",
          calendarBackground: Colors.lightPrimary,
          selectedDayBackgroundColor: Colors.primary,
          todayTextColor: Colors.primary,
          dayTextColor: "#000",
          textDisabledColor: Colors.gray,
          dotColor: Colors.primary,
          arrowColor: Colors.primary,
          monthTextColor: "#000",
          indicatorColor: Colors.primary,
          textDayFontFamily: "U-Medium",
          textMonthFontFamily: "U-Medium",
          textDayHeaderFontFamily: "U-Medium",
          textDayFontWeight: "medium",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "medium",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
        disableAllTouchEventsForDisabledDays={true}
        minDate={new Date().toISOString().split("T")[0]}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "orange",
          },
        }}
      />
      {!!selected && (
        <View>
          <RNText
            style={{
              fontSize: 21,
              lineHeight: 28,
              textAlign: "center",
              marginVertical: 7,
            }}
            font={"U-Bold"}
          >
            Select Time
          </RNText>

          {slots?.length > 0 ? (
            <>
              <FlatList
                style={{ marginTop: 20, marginBottom: 20 }}
                data={slots}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setTimeSelected(item);
                    }}
                    style={{
                      marginHorizontal: 4,
                      width: 95,
                      padding: 7,
                      borderRadius: 5,
                    }}
                  >
                    <RNText
                      font={"U-Bold"}
                      style={{
                        borderWidth: 1,
                        backgroundColor:
                          timeSelected === item ? Colors.primary : "white",
                        color: timeSelected === item ? "white" : Colors.primary,
                        borderRadius: 10,
                        padding: 4,
                        fontSize: 14,
                        lineHeight: 24.5,
                        textAlign: "center",
                      }}
                    >
                      {item}
                    </RNText>
                  </TouchableOpacity>
                )}
              />
              {timeSelected && (
                <RNText
                  font={"U-Bold"}
                  style={{
                    color: Colors.mediumGray,
                    textAlign: "center",
                    marginVertical: 7,
                  }}
                >
                  {timeSelected ? `Date & Time: ` : ""}
                  <RNText
                    style={{
                      color: Colors.primary,
                    }}
                    font={"U-Bold"}
                  >
                    {" "}
                    {dayjs(selected).format("MMM DD, YYYY")} | {timeSelected}
                  </RNText>
                </RNText>
              )}
              <View
                style={{
                  marginVertical: 3.5,
                }}
              >
                {loading ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Loading size={heightPercentageToDP(6.5)} />
                  </View>
                ) : (
                  <Pressable
                    style={{
                      backgroundColor: !timeSelected
                        ? Colors.gray
                        : Colors.primary,
                      borderRadius: 999,
                      marginVertical: 7,
                    }}
                    disabled={!timeSelected}
                    onPress={handleBooking}
                  >
                    <RNText
                      style={{
                        fontSize: heightPercentageToDP(2.5),
                        color: "#fff",
                        padding: 3.5 * 2.5,
                        borderRadius: 5,
                        marginVertical: 3.5,
                        textAlign: "center",
                      }}
                      font={"U-Bold"}
                    >
                      Book Now - ${price}
                    </RNText>
                  </Pressable>
                )}
              </View>
            </>
          ) : (
            <RNText
              style={{
                textAlign: "center",
                marginVertical: 7,
              }}
              font={"U-Bold"}
            >
              No Slots Available
            </RNText>
          )}
        </View>
      )}
    </View>
  );
};

export default Book;
