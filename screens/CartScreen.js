// screens/CheckoutScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckoutScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        const exampleCart = [
          {
            id: '1',
            image: require('../assets/dress1.png'),
            title: 'Office Wear',
            description: 'Office wear for your office',
            price: '120',
          },
          {
            id: '2',
            image: require('../assets/dress2.png'),
            title: 'Lamerei',
            description: 'Recycle Boucle Knit Cardigan Pink',
            price: '120',
          },
          {
            id: '3',
            image: require('../assets/dress3.png'),
            title: 'Church Wear',
            description: 'Recycle Boucle Knit Cardigan Pink',
            price: '120',
          },
        ];
        setCart(exampleCart);
        await AsyncStorage.setItem('cart', JSON.stringify(exampleCart));
      }
    };
    loadCart();
  }, []);

  const removeFromCart = async (product) => {
    const newCart = cart.filter(item => item.id !== product.id);
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/Logo.png')} // Ensure you have a logo image in the assets folder
          style={styles.logo}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Image source={require('../assets/Search.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>CHECKOUT</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{item.Title}</Text>
              <Text style={styles.productname}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item)}
            >
              <Image source={require('../assets/remove.png')} style={styles.removeIcon} />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>EST. TOTAL</Text>
              <Text style={styles.totalAmount}>${getTotal()}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Payment')}>
              <Image source={require('../assets/shoppingBag.png')} style={styles.checkoutIcon} />
              <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  productImage: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  productDetails: {
    flex: 1,
    paddingLeft: 20,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  productDescription: {
    fontSize: 16,
    color: '#888',
  },
  productPrice: {
    fontSize: 18,
    color: 'orange',
    marginTop: 5,
  },
  removeButton: {
    padding: 10,
  },
  removeIcon: {
    width: 30,
    height: 30,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
    alignItems: 'center', // Center align items in the footer
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%', // Ensure totalContainer takes full width
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 20,
    color: 'orange',
  },
  checkoutButton: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Ensure checkoutButton takes full width
  },
  checkoutIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
