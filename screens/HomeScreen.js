// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
  { id: '1', Title:'Office Wear',name: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress1.png') },
  { id: '2',Title:'Black', name: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress2.png') },
  { id: '3', Title:'Church Wear',name: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress3.png') },
  { id: '4', Title:'Lamerei',name: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress4.png') },
  { id: '5',Title:'21WN', name: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress5.png') },
  { id: '6',Title:'Lopo', name: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress6.png') },
  { id: '7',Title:'21WN', name: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress7.png') },
  { id: '8',Title:'Lame', name: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress3.png') },
  // add more products as needed
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../assets/Menu.png')} style={styles.icon} />
        </TouchableOpacity>
        <Image
          source={require('../assets/Logo.png')} // Make sure to have a logo image in the assets folder
          style={styles.logo}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Image source={require('../assets/Search.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={require('../assets/shoppingBag.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ourStorySection}>
        <Text style={styles.ourStoryText}>OUR STORY</Text>
        <View style={styles.storyIconContainer}>
          <Image source={require('../assets/Listview.png')} style={styles.storyIcon} />
          <Image source={require('../assets/Filter.png')} style={styles.storyIcon} />
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <View style={styles.productImageContainer}>
              <Image source={item.image} style={styles.productImage} />
              <TouchableOpacity
                style={styles.addCircle}
                onPress={() => addToCart(item)}
              >
                <Image source={require('../assets/add_circle.png')} style={styles.addCircleImage} />
              </TouchableOpacity>
              </View>
            <Text style={styles.productTitle}>{item.Title}</Text>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>
        )}
      />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
    resizeMode: 'contain',
  },
  ourStorySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  ourStoryText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  storyIconContainer: {
    flexDirection: 'row',
  },
  storyIcon: {
    width: 30,
    height: 30,
    marginLeft: 20,
    resizeMode: 'contain',
  },
  productList: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  productItem: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    alignItems: 'center',
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  addCircle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  addCircleImage: {
    width: 30,
    height: 30,
  },
  productTitle: {
    fontSize: 20,
   
  },
  productName: {
    fontSize: 18,
  },
  productPrice: {
    fontSize: 16,
    color: 'orange',
    marginTop: 5,
  },
});

export default HomeScreen;
