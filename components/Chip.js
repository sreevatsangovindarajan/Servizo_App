// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const Timeline = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.timeline}>
//         <View style={styles.dot} />
//         <View style={styles.line} />
//         <View style={styles.dot} />
//         <View style={styles.line} />
//         <View style={styles.dot} />
//         <View style={styles.line} />
//         <View style={styles.dot} />
//         <View style={styles.line} />
//         <View style={styles.dot} />
//       </View>
//       <View style={styles.stageContainer}>
//         <View style={styles.stage}>
//           <Text style={styles.stageText}>New Case</Text>
//         </View>
//         <View style={styles.stage}>
//           <Text style={styles.stageText}>Confirmed</Text>
//         </View>
//         <View style={styles.stage}>
//           <Text style={styles.stageText}>Completed</Text>
//         </View>
//         <View style={styles.stage}>
//           <Text style={styles.stageText}>Rejected</Text>
//         </View>
//         <View style={styles.stage}>
//           <Text style={styles.stageText}>Work In Progress</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   timeline: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "black",
//     marginHorizontal: 5,
//   },
//   line: {
//     flex: 1,
//     height: 2,
//     backgroundColor: "black",
//   },
//   stageContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   stage: {
//     alignItems: "center",
//   },
//   stageText: {
//     fontSize: 12,
//     marginTop: 5,
//   },
// });

// export default Timeline;
import React from "react";
import { View, StyleSheet } from "react-native";
import RNText from "./RNText";

const Chip = ({ stage }) => {
  let chipColor;
  switch (stage) {
    case NEW_CASE:
      chipColor = "#FF9800";
      break;
    case CONFIRMED:
      chipColor = "#4CAF50";
      break;
    case COMPLETED:
      chipColor = "#2196F3";
      break;
    case REJECTED:
      chipColor = "#F44336";
      break;
    case WORK_IN_PROGRESS:
      chipColor = "#9C27B0";
      break;
    default:
      chipColor = "#9E9E9E";
  }

  return (
    <View style={[styles.container, { backgroundColor: chipColor }]}>
      <RNText style={styles.text}>{stage}</RNText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  text: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
});

export default Chip;

//create constants for the stages
export const NEW_CASE = "New Case";
export const CONFIRMED = "Confirmed";
export const COMPLETED = "Completed";
export const REJECTED = "Rejected";
export const WORK_IN_PROGRESS = "Work In Progress";
