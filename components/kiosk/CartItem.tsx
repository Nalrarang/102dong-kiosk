import { ItemType } from '@/constants/Product';
import { AntDesign } from '@expo/vector-icons';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';

interface CartItemProps {
  item: ItemType;
  options: string;
  price: number;
  removeItem: () => void;
}

const CartItem = ({ item, options, price, removeItem }: CartItemProps) => {
  const option = JSON.parse(options);
  const option_value = item.options.includes('weight')
    ? (Number(option['weight']) - Number(option['container_weight'])).toFixed(1) + 'kg'
    : option['quantity'] + '개';

  return (
    <View style={styles.cart_item_wrapper}>
      <Pressable style={styles.close_button} onPress={removeItem}>
        <AntDesign name='close' size={24} color='#878787' />
      </Pressable>
      <Image source={item.image} style={styles.cart_thumbnail} />
      <View>
        <Text style={styles.cart_item_title}>{item.title}</Text>
        <Text style={styles.cart_item_options}>{option_value}</Text>
        <Text style={styles.cart_item_price}>{price.toLocaleString()}원</Text>
      </View>
      <View style={styles.divider}></View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cart_item_wrapper: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  cart_thumbnail: {
    width: 64,
    height: 64,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 64,
  },
  cart_item_title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3D3D3D',
    textAlign: 'center',
  },
  cart_item_options: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#787887',
    textAlign: 'center',
  },
  cart_item_price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3D3D3D',
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#EDEDED',
  },
  close_button: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
});
