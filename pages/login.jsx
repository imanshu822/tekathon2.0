import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";

const Login = ({ navigation }) => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="auto" />
      <View style={styles.base}>
        <Image style={styles.img} source={require("../assets/logo.jpg")} />
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor={"#838383"}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor={"#838383"}
        />
        <Text style={styles.uiText}>Forgot Password?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: "#fff",
    padding: 30,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 200,
    height: 200,
    marginRight: 15,
  },
  input: {
    width: "100%",
    height: 50,
    margin: 12,
    backgroundColor: "#f5f7fb",
    borderRadius: 5,
    padding: 15,
    color: "#838383",
  },
  button: {
    marginTop: 20,
    marginBottom: 25,
    width: "100%",
    height: 50,
    backgroundColor: "#3950a2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  uiText: {
    fontSize: 15,
    color: "#838383",
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  group: {
    width: "100%",
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    flexDirection: "row",
    fontSize: 15,
    color: "#838383",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
});

export default Login;
