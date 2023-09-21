import { StyleSheet, Text, View } from "react-native";

const TopBar = () => {
  return (
    <View style={styles.container}>
      <Text>ResQLink</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    top: 0,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default TopBar;
