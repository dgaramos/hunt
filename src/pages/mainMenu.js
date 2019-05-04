import React, { Component } from "react";
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default class MainMenu extends Component {

  state = {
    data: [
      { id: "00", name: "JS Package List", page: "JSPackageList" }
    ]
  };

  static navigationOptions = {
    title: 'React Native Tutorials App'
  };

  createRows = (data, columns) => {
    const rows = Math.floor(data.length / columns);
    let lastRowElements = data.length - rows * columns;
    while (lastRowElements !== columns) {
      data.push({
        id: `empty-${lastRowElements}`,
        name: `empty-${lastRowElements}`,
        empty: true
      });
      lastRowElements += 1;
    }
    return data;
  };

  render() {
    const columns = 3;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.createRows(this.state.data, columns)}
          keyExtractor={item => item.id}
          numColumns={columns}
          renderItem={({ item }) => {
            if (item.empty) {
              return <View style={[styles.item, styles.itemEmpty]} />;
            }
            return (
              <TouchableOpacity 
              style={styles.item}
              onPress={() => {
                    this.props.navigation.navigate(item.page);
                }}
              >
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>

            );
          }}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#999"
  },

  item: {
    height: 100,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "white",
    flexBasis: 0,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    padding: 5
  },

  text: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold"
  },
  
  itemEmpty: {
    borderColor: "transparent",
    backgroundColor: "transparent"
  },

});