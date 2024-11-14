import { ProductType } from '@/constants/Product';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BaseText from './BaseText';
interface MenuItemProps {
  type: ProductType;
  title: string;
  menu_price: string;
  image: any;
  price: number;
  options: string[];
}

const MenuItem = ({ type, title, menu_price, price, image, options }: MenuItemProps) => {
  return (
    <View
      style={{
        ...styles.menu_item,
        backgroundColor: type === ProductType.BASIC ? '#F8F8F7' : '#C22C24',
      }}
    >
      <Image source={image} style={styles.thumbnail} />
      <View style={{ alignItems: 'center' }}>
        <BaseText
          weight='bold'
          style={{
            fontSize: 16,
            color: type === ProductType.BASIC ? '#3D3D3D' : '#FFFFFF',
          }}
        >
          {title}
        </BaseText>
        <BaseText
          weight='semibold'
          style={{
            fontSize: 16,
            color: type === ProductType.BASIC ? '#3D3D3D' : '#FFFFFF',
          }}
        >
          {menu_price}
        </BaseText>
      </View>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  menu_item: {
    width: 135,
    height: 150,
    backgroundColor: '#C22C24',
    borderRadius: 30,
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#00000012',
  },
});
