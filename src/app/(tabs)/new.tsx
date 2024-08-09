import { StyleSheet, Text, View } from "react-native";

import React from "react";

const AddPost = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Post</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AddPost;
