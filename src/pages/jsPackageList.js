import React, { Component } from 'react';
import api from "../services/api"

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default class JSPackageList extends Component {

    state = {
        productInfo:{},
        docs: [],
        page: 1
    };

    static navigationOptions = {
        title: 'Javascript Package List'
    };

    async componentDidMount() {
        await this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        console.log(docs, productInfo)

        this.setState({
            docs: [...this.state.docs, ...docs], 
            productInfo,
            page
        });
    };

    loadMore = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber)
    };

    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription} >{item.description}</Text>

            <TouchableOpacity 
                style={styles.productButton} 
                onPress={() => {
                    this.props.navigation.navigate("Product", { product: item });
                }}>
                <Text style={styles.productButtonText}>Go To Repository</Text>
            </TouchableOpacity>
        </View>
    )

    listFooter = () => (
        <View style={styles.productListFooter}>
            <Text style={styles.productTitle}>No more items to show</Text>
        </View>
    )

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item => item._id}
                    renderItem={this.renderLastItem, this.renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedTreshold={0.1}
                    ListFooterComponent={this.listFooter}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#999"
    },
    list: {
        padding: 20
    },
    productContainer: {
        backgroundColor:"#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },

    productTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333"
    },

    productDescription: {
        fontSize: 16,
        marginTop: 5,
        lineHeight: 24
    },

    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#000",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },

    productButtonText: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold"
    },

    productListFooter: {
        backgroundColor:"#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center"
    },

});