import { View, Pressable, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import RNText from "../../components/RNText";
import { blurhash } from "../../constants";
import Colors from "../../constants/Colors";
import { updateBooking } from "../../constants/api";
import { router } from "expo-router";
const Booking = ({ item, userId }) => {
  const {
    serviceId,
    image,
    name,
    price,
    rating,
    numReviews,
    agent,
    date,
    status,
    serviceRating,
    id,
    description,
  } = item;
  const [showMore, setShowMore] = useState(false);
  const [userRating, setUserRating] = useState(serviceRating);

  const handleRating = async (value) => {
    setUserRating(value);
    const { success } = await updateBooking(id, userId, {
      serviceRating: value,
    });
    if (success) {
      Alert.alert("Service Rated", "Thank you for rating the service");
    } else {
      Alert.alert("Failed to rate the service", "Please try again");
    }
  };
  const cancelBooking = async () => {
    const { success } = await updateBooking(id, userId, {
      status: "Cancelled",
    });
    if (success) {
      Alert.alert("Booking Cancelled", "Your booking has been cancelled");
    } else {
      Alert.alert("Failed to cancel booking", "Please try again");
    }
  };
  const completeBooking = async () => {
    const { success } = await updateBooking(id, userId, {
      status: "Completed",
    });
    if (success) {
      Alert.alert("Booking Completed", "Your booking has been completed");
    } else {
      Alert.alert("Failed to complete booking", "Please try again");
    }
  };
  return (
    <View
      style={{
        width: wp(95),
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "white",
        borderRadius: 10,
        margin: 10,
        paddingBottom: 40,
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Image
          style={{
            width: wp(30),
            aspectRatio: 1,
            borderRadius: 10,
            objectFit: "contain",
            marginHorizontal: 5,
          }}
          source={image}
          placeholder={blurhash}
          transition={500}
        />

        <View
          style={{
            marginLeft: 10,
            flex: 1,
            position: "relative",
          }}
        >
          {status === "Cancelled" ? (
            <RNText
              style={{
                fontSize: 12,
                color: "#f75555",
                letterSpacing: 1,
              }}
              font={"U-Bold"}
              numberOfLines={1}
            >
              BOOKING CANCELLED
            </RNText>
          ) : (
            <RNText
              style={{
                fontSize: 12,
                color: "#4aaf57",
                letterSpacing: 1,
              }}
              font={"U-Bold"}
              numberOfLines={1}
            >
              <MaterialIcons name="person" size={12} color={"#4aaf57"} />{" "}
              PROFESSIONAL ASSIGNED
            </RNText>
          )}
          <RNText
            style={{
              fontSize: 18,
            }}
            font={"U-Black"}
            numberOfLines={1}
          >
            {name}
          </RNText>
          {status === "Cancelled" ? (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <RNText
                  style={{
                    color: Colors.primary,
                    marginVertical: 1,
                    fontSize: 14,
                  }}
                  font={"U-Bold"}
                >
                  {date}
                </RNText>
              </View>
            </>
          ) : (
            <>
              <RNText
                style={{
                  color: Colors.mediumGray,
                  marginVertical: 1,
                }}
                font={"U-Bold"}
                numberOfLines={1}
              >
                Patner:{" "}
                <RNText
                  style={{
                    color: Colors.primary,
                    marginVertical: 1,
                  }}
                  font={"U-Bold"}
                  numberOfLines={1}
                >
                  {agent.name}
                </RNText>
              </RNText>
              <RNText
                style={{
                  marginTop: 1,
                  color: Colors.mediumGray,
                }}
                font={"U-Medium"}
              >
                <FontAwesome name="star" size={16} color={Colors.yellow} />{" "}
                {rating} | ({numReviews} Reviews)
              </RNText>
            </>
          )}
          <View
            style={{
              flexDirection: "row",
            }}
            font={"U-Medium"}
          >
            <RNText
              style={{
                color: "white",
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
                marginVertical: 5,
                backgroundColor:
                  status === "Completed"
                    ? "#4aaf57"
                    : status === "Booked"
                    ? Colors.primary
                    : "#f75555",
              }}
              font={"U-Bold"}
            >
              {status}
            </RNText>
          </View>
        </View>
      </View>

      {showMore && (
        <View
          style={{
            marginTop: 10,
            padding: 10,
          }}
        >
          {status === "Booked" && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <RNText
                  style={{
                    color: Colors.mediumGray,
                    fontSize: 16,
                  }}
                  font={"U-Medium"}
                >
                  OTP to start the service
                </RNText>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 2,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: Colors.primary,
                      padding: 5,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                    }}
                  >
                    <RNText
                      style={{
                        color: "#fff",
                      }}
                      font={"U-Bold"}
                    >
                      1
                    </RNText>
                  </View>
                  <View
                    style={{
                      backgroundColor: Colors.primary,
                      padding: 5,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                    }}
                  >
                    <RNText
                      style={{
                        color: "#fff",
                      }}
                      font={"U-Bold"}
                    >
                      2
                    </RNText>
                  </View>
                  <View
                    style={{
                      backgroundColor: Colors.primary,
                      padding: 5,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                    }}
                  >
                    <RNText
                      style={{
                        color: "#fff",
                      }}
                      font={"U-Bold"}
                    >
                      3
                    </RNText>
                  </View>
                  <View
                    style={{
                      backgroundColor: Colors.primary,
                      padding: 5,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                    }}
                  >
                    <RNText
                      style={{
                        color: "#fff",
                      }}
                      font={"U-Bold"}
                    >
                      4
                    </RNText>
                  </View>
                </View>
              </View>
              <View
                style={{
                  gap: 2,
                }}
              >
                <RNText
                  style={{
                    fontSize: 17.5,
                    lineHeight: 24.5,
                    marginVertical: 3.5,
                  }}
                  font={"U-Bold"}
                >
                  Booking Details
                </RNText>
                <RNText
                  style={{
                    color: Colors.mediumGray,
                    fontSize: 15.75,
                    lineHeight: 24.5,
                  }}
                  font={"U-Medium"}
                >
                  Amount to Pay:{" "}
                  <RNText
                    style={{
                      color: Colors.primary,
                    }}
                    font={"U-Bold"}
                  >
                    ${price}
                  </RNText>
                </RNText>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <RNText
                    style={{
                      color: Colors.mediumGray,
                      fontSize: 15.75,
                      lineHeight: 24.5,
                    }}
                    font={"U-Medium"}
                  >
                    Date & Time
                  </RNText>

                  <RNText
                    style={{
                      color: Colors.primary,
                      fontSize: 15.75,
                      lineHeight: 24.5,
                    }}
                    font={"U-Bold"}
                  >
                    {date}
                  </RNText>
                </View>

                <View
                  style={{
                    marginHorizontal: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Pressable
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: Colors.lightGray,
                      borderRadius: 5,
                      marginVertical: 10,
                    }}
                    font={"U-Medium"}
                    onPress={cancelBooking}
                  >
                    <RNText
                      style={{
                        color: "#f75555",
                        padding: 5,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        marginVertical: 5,
                      }}
                      font={"U-Bold"}
                    >
                      Cancel Booking
                    </RNText>
                  </Pressable>

                  <Pressable
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: Colors.lightGray,
                      borderRadius: 5,
                      marginVertical: 10,
                    }}
                    onPress={completeBooking}
                    font={"U-Medium"}
                  >
                    <RNText
                      style={{
                        color: Colors.primary,
                        padding: 5,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        marginVertical: 5,
                      }}
                      font={"U-Bold"}
                    >
                      Complete Booking
                    </RNText>
                  </Pressable>
                </View>
              </View>
            </>
          )}
          {status === "Completed" && (
            <View
              style={{
                gap: 2,
              }}
            >
              <RNText
                style={{
                  fontSize: 17.5,
                  lineHeight: 24.5,
                  marginVertical: 3.5,
                }}
                font={"U-Bold"}
              >
                Booking Details
              </RNText>
              <RNText
                style={{
                  color: Colors.mediumGray,
                  fontSize: 15.75,
                  lineHeight: 24.5,
                }}
                font={"U-Medium"}
              >
                Amount Paid:{" "}
                <RNText
                  style={{
                    color: Colors.primary,
                  }}
                  font={"U-Bold"}
                >
                  ${price}
                </RNText>
              </RNText>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <RNText
                  style={{
                    color: Colors.mediumGray,
                    fontSize: 15.75,
                    lineHeight: 24.5,
                  }}
                  font={"U-Medium"}
                >
                  Date & Time
                </RNText>

                <RNText
                  style={{
                    color: Colors.primary,
                    fontSize: 15.75,
                    lineHeight: 24.5,
                  }}
                  font={"U-Bold"}
                >
                  {date}
                </RNText>
              </View>

              <View
                style={{
                  marginVertical: 5,
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                <RNText
                  font={"U-Medium"}
                  style={{
                    color: Colors.mediumGray,
                    fontSize: 15.75,
                    lineHeight: 24.5,
                  }}
                >
                  Rate the service:
                </RNText>
                <View style={{ flexDirection: "row" }}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <TouchableOpacity
                      key={value}
                      onPress={() => handleRating(value)}
                      style={{ marginHorizontal: 5 }}
                    >
                      <MaterialIcons
                        name={userRating >= value ? "star" : "star-border"}
                        size={24}
                        color={userRating >= value ? "gold" : "gray"}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          )}
          {status === "Cancelled" && (
            <>
              <View
                style={{
                  gap: 2,
                }}
              >
                <RNText
                  style={{
                    fontSize: 17.5,
                    lineHeight: 24.5,
                    marginVertical: 3.5,
                  }}
                  font={"U-Bold"}
                >
                  Booking Details
                </RNText>
                <RNText
                  style={{
                    color: Colors.mediumGray,
                    fontSize: 15.75,
                    lineHeight: 24.5,
                  }}
                  font={"U-Medium"}
                >
                  Amount to Pay:{" "}
                  <RNText
                    style={{
                      color: Colors.primary,
                    }}
                    font={"U-Bold"}
                  >
                    ${0}
                  </RNText>
                </RNText>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <RNText
                    style={{
                      color: Colors.mediumGray,
                      fontSize: 15.75,
                      lineHeight: 24.5,
                    }}
                    font={"U-Medium"}
                  >
                    Date & Time
                  </RNText>

                  <RNText
                    style={{
                      color: Colors.primary,
                      fontSize: 15.75,
                      lineHeight: 24.5,
                    }}
                    font={"U-Bold"}
                  >
                    {date}
                  </RNText>
                </View>
                <RNText
                  style={{
                    fontSize: 17.5,
                    lineHeight: 24.5,
                    marginVertical: 3.5,
                  }}
                  font={"U-Bold"}
                >
                  Your Request was cancelled
                </RNText>
                <View
                  style={{
                    marginHorizontal: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Pressable
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: Colors.lightGray,
                      borderRadius: 10,
                      marginVertical: 10,
                      backgroundColor: Colors.primary,
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
                        color: "#fff",
                        padding: 5,
                        paddingHorizontal: 20,
                        borderRadius: 5,
                        marginVertical: 5,
                      }}
                      font={"U-Bold"}
                    >
                      Book Again
                    </RNText>
                  </Pressable>
                </View>
              </View>
            </>
          )}
        </View>
      )}
      <MaterialIcons
        name={showMore ? "keyboard-arrow-up" : "keyboard-arrow-down"}
        size={32}
        color={Colors.primary}
        style={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          zIndex: 3,
        }}
        onPress={() => {
          setShowMore(!showMore);
        }}
      />
    </View>
  );
};

export default Booking;
