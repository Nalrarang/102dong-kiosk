import BaseText from '@/components/kiosk/BaseText';
import CartItem from '@/components/kiosk/CartItem';
import MenuItem from '@/components/kiosk/MenuItem';
import ProductModal from '@/components/kiosk/ProductModal';
import ReceiptModal from '@/components/kiosk/ReceiptModal';
import { CartItemType, ItemType, Other, Product } from '@/constants/Product';
import { FontAwesome5 } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { StyleSheet, Image, Platform, View, ScrollView, TouchableOpacity, Pressable, Alert } from 'react-native';

export default function Index() {
  const [is_product_modal_open, setIsProductModalOpen] = useState(false);
  const [is_receipt_modal_open, setIsReceiptModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<ItemType | null>(null);
  const [cart_items, setCartItems] = useState<CartItemType[]>([]);

  const total_price = useMemo(() => {
    return cart_items.reduce((acc, cur) => acc + cur.price, 0);
  }, [cart_items]);

  const addCartItem = (item: CartItemType) => {
    setCartItems([...cart_items, item]);
  };

  const removeCartItem = (idx: number) => {
    setCartItems(cart_items.filter((_, index) => idx !== index));
  };

  const allClearCartItem = () => {
    setCartItems([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View style={{ gap: 40 }}>
            <View style={styles.top_menu}>
              <Image source={require('../assets/images/logo.png')} style={styles.logo_image} />
              <View style={styles.title}>
                <BaseText weight='bold' style={styles.title_main_text}>
                  상품을
                </BaseText>
                <BaseText weight='regular' style={styles.title_main_text}>
                  선택해 주세요.
                </BaseText>
              </View>
            </View>
            <View style={styles.menu_wrapper}>
              {Product.map((product, idx) => (
                <TouchableOpacity
                  key={`main_${idx}`}
                  onPress={() => {
                    setSelectedProduct(product);
                    setIsProductModalOpen(true);
                  }}
                >
                  <MenuItem {...product} />
                </TouchableOpacity>
              ))}
            </View>
            <BaseText weight='bold' style={styles.title_main_text}>
              다른 상품들
            </BaseText>
            <View style={styles.menu_wrapper}>
              {Other.map((other, idx) => (
                <TouchableOpacity
                  key={`other_${idx}`}
                  onPress={() => {
                    setSelectedProduct(other);
                    setIsProductModalOpen(true);
                  }}
                >
                  <MenuItem {...other} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.my_cart}>
        <View style={{ flex: 1, flexDirection: 'column', gap: 20 }}>
          <BaseText weight='bold' style={styles.cart_title}>
            내 주문
          </BaseText>
          <View style={styles.divider} />
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            {cart_items.length === 0 && (
              <View style={{ minHeight: 500, justifyContent: 'center', alignItems: 'center', gap: 15 }}>
                <FontAwesome5 name='shopping-cart' size={38} color='#898987' />
                <BaseText weight='light' style={{ fontSize: 28, color: '#898987', textAlign: 'center' }}>
                  메뉴에서 상품을 담아주세요.
                </BaseText>
              </View>
            )}
            {cart_items.map((item, idx) => (
              <CartItem
                key={idx}
                item={item.item}
                price={item.price}
                options={item.selected_options}
                removeItem={() => removeCartItem(idx)}
              />
            ))}
          </ScrollView>
          <View style={styles.divider} />
          <View style={{ height: 250, gap: 20, padding: 10, marginTop: 40, alignItems: 'center' }}>
            <BaseText weight='bold' style={styles.total_text}>
              총 금액
            </BaseText>
            <BaseText weight='regular' style={styles.total_price}>
              {total_price.toLocaleString()}원
            </BaseText>
            <Pressable
              disabled={total_price <= 0}
              style={{ ...styles.payButton, backgroundColor: '#FFCA40', opacity: total_price <= 0 ? 0.4 : 1 }}
              onPress={() => {
                if (Platform.OS === 'web') {
                  if (confirm('결제하시겠습니까?')) {
                    setIsReceiptModalOpen(true);
                  }
                } else {
                  Alert.alert('결제하시겠습니까?', '', [
                    {
                      text: '취소',
                      style: 'cancel',
                    },
                    {
                      text: '확인',
                      onPress: () => {
                        setIsReceiptModalOpen(true);
                      },
                    },
                  ]);
                }
              }}
            >
              <BaseText weight='semibold' style={styles.pay}>
                결제하기
              </BaseText>
            </Pressable>
          </View>
        </View>
      </View>
      <ProductModal
        opened={is_product_modal_open}
        onClose={() => setIsProductModalOpen(false)}
        selected_item={selectedProduct}
        setCartItems={addCartItem}
      />
      <ReceiptModal
        opened={is_receipt_modal_open}
        onClose={() => {
          allClearCartItem();
          setIsReceiptModalOpen(false);
        }}
        cart_items={cart_items}
        total_price={total_price}
      />
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
    fontSize: 64,
    color: '#3D3D3D',
  },
  my_cart: {
    backgroundColor: '#FBFBF9',
    width: 292,
    flex: 0.3,
    padding: 20,
    gap: 10,
  },
  cart_title: {
    marginTop: 150,
    fontSize: 36,
    color: '#3D3D3D',
    textAlign: 'center',
  },
  total_text: {
    fontSize: 24,
    color: '#898987',
    textAlign: 'center',
  },
  total_price: {
    fontSize: 36,
    color: '#3D3D3D',
    textAlign: 'center',
  },
  payButton: {
    width: 150,
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
  },
  pay: {
    fontSize: 24,
    color: '#3D3D3D',
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#EDEDED',
  },
  menu_wrapper: {
    gap: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
});
