import MenuItem from '@/components/kiosk/MenuItem';
import ProductModal from '@/components/kiosk/ProductModal';
import { Other, Product } from '@/constants/Product';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import Modal from 'react-native-modal';

export default function Index() {
  const [is_product_modal_open, setIsProductModalOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <ScrollView>
          <View style={{ gap: 40 }}>
            <View style={styles.top_menu}>
              <Image source={require('../assets/images/logo.png')} style={styles.logo_image} />
              <View style={styles.title}>
                <Text style={styles.title_main_text}>상품을</Text>
                <Text style={styles.title_sub_text}>선택해 주세요.</Text>
              </View>
            </View>
            <View style={styles.menu_wrapper}>
              {Product.map((product, idx) => (
                <TouchableOpacity key={`main_${idx}`} onPress={() => setIsProductModalOpen(true)}>
                  <MenuItem {...product} />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.title_main_text}>다른 상품들</Text>
            <View style={styles.menu_wrapper}>
              {Other.map((other, idx) => (
                <MenuItem key={idx} {...other} />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.my_cart}></View>
      <ProductModal opened={is_product_modal_open} onClose={() => setIsProductModalOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  logo_image: {
    width: 93,
    height: 118,
    marginTop: 20,
  },
  menu: {
    flex: 0.7,
    width: 580,
    padding: 45,
    flexDirection: 'column',
    gap: 40,
    overflow: 'scroll',
  },
  top_menu: {
    flexDirection: 'column',
    gap: 92,
  },
  title: {
    flexDirection: 'column',
  },
  title_main_text: {
    fontFamily: 'Inter',
    fontSize: 64,
    fontWeight: 'bold',
    color: '#3D3D3D',
  },
  title_sub_text: {
    fontFamily: 'Inter',
    fontSize: 64,
    fontWeight: 'medium',
    color: '#3D3D3D',
  },
  my_cart: {
    backgroundColor: '#FBFBF9',
    width: 292,
    flex: 0.3,
  },
  menu_wrapper: {
    gap: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
});
