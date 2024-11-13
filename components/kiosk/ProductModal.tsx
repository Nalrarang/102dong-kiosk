import Modal from 'react-native-modal';
import { StyleSheet, View, Text, Image, TextInput, Button, Pressable } from 'react-native';
import { CartItemType, ItemType } from '@/constants/Product';
import { useMemo, useState } from 'react';
import { Entypo } from '@expo/vector-icons';

interface Props {
  opened: boolean;
  onClose: () => void;
  selected_item: ItemType | null;
  setCartItems: (item: CartItemType) => void;
}

const ProductModal = ({ opened, onClose, selected_item, setCartItems }: Props) => {
  const [weight, setWeight] = useState<string>('');
  const [container_weight, setContainerWeight] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const price = useMemo(() => {
    if (selected_item) {
      if (selected_item.options.includes('weight')) {
        const item = Number(Number(weight).toFixed(1)) * 10;
        const container = Number(Number(container_weight).toFixed(1)) * 10;
        return (item - container) * selected_item.price;
      }
      if (selected_item.options.includes('quantity')) {
        return selected_item.price * quantity;
      }
    }
    return 0;
  }, [selected_item, weight, container_weight, quantity]);

  const onModalClose = () => {
    setWeight('');
    setContainerWeight('');
    setQuantity(1);
    onClose();
  };

  const addItem = () => {
    if (selected_item) {
      setCartItems({
        item: selected_item,
        price,
        selected_options: JSON.stringify({
          weight,
          container_weight,
          quantity,
        }),
      });
      onModalClose();
    }
  };

  if (!selected_item) {
    return null;
  }

  return (
    <Modal isVisible={opened}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>옵션 선택</Text>
        </View>
        {/* 상세 컨텐츠 영역 */}
        <View style={styles.modalBody}>
          <View style={styles.contentWrapper}>
            <View style={styles.thumbnailWrapper}>
              <View style={styles.thumbnail}>
                <Image source={selected_item.image} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
              </View>
              <View>
                <Text style={styles.thumbnailText}>{selected_item.title}</Text>
                <Text style={styles.thumbnailText}>{selected_item.menu_price}</Text>
              </View>
            </View>
            <View style={styles.formWrapper}>
              <View style={{ marginTop: 35 }}>
                {selected_item.options.includes('weight') && (
                  <>
                    <Text style={styles.formLabel}>무게 입력(단위: kg)</Text>
                    <TextInput
                      inputMode={'numeric'}
                      style={styles.formInput}
                      value={weight}
                      onChangeText={(v) => setWeight(v)}
                      placeholder='무게를 입력하세요.'
                      placeholderTextColor='#D8D8D8'
                    />
                  </>
                )}
                {selected_item.options.includes('quantity') && (
                  <>
                    <Text style={styles.formLabel}>수량 입력</Text>
                    <View style={styles.quantityWrapper}>
                      <Pressable
                        disabled={quantity <= 1}
                        style={{ ...styles.quantityButton, backgroundColor: quantity <= 1 ? '#D8D8D8' : '#C22C24' }}
                        onPress={() => setQuantity(quantity - 1)}
                      >
                        <Entypo name='minus' size={42} color='#ffffff' />
                      </Pressable>
                      <Text style={styles.quantity}>{quantity}</Text>
                      <Pressable
                        style={{ ...styles.quantityButton, backgroundColor: '#C22C24' }}
                        onPress={() => setQuantity(quantity + 1)}
                      >
                        <Entypo name='plus' size={42} color='#ffffff' />
                      </Pressable>
                    </View>
                  </>
                )}
              </View>
              {selected_item.options.includes('container_exclude') && (
                <View>
                  <Text style={styles.formLabel}>김치통 무게 입력(단위: kg)</Text>
                  <TextInput
                    inputMode={'numeric'}
                    style={styles.formInput}
                    value={container_weight}
                    onChangeText={(v) => setContainerWeight(v)}
                    placeholder='무게를 입력하세요.'
                    placeholderTextColor='#D8D8D8'
                  />
                </View>
              )}
              <View>
                <Text style={styles.price}>총 가격: {price.toLocaleString()}원</Text>
              </View>
            </View>
          </View>
        </View>
        {/* 버튼 영역 */}
        <View style={styles.buttonWrapper}>
          <Pressable style={{ ...styles.button, backgroundColor: '#F1F1F8' }} onPress={onModalClose}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#363644' }}>취소</Text>
          </Pressable>
          <Pressable
            disabled={price === 0}
            style={{ ...styles.button, backgroundColor: '#C22C24', opacity: price === 0 ? 0.7 : 1 }}
            onPress={addItem}
          >
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#ffffff' }}>담기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ProductModal;

const styles = StyleSheet.create({
  modalContent: {
    minHeight: 700,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderColor: '#D8D8D8',
    borderRadius: 16,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  titleContainer: {
    height: 90,
    backgroundColor: '#C22C24',
    borderWidth: 1,
    borderColor: '#C22C24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalBody: {
    flex: 1,
    padding: 45,
    gap: 20,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  thumbnailWrapper: {
    width: 280,
    gap: 30,
    alignItems: 'center',
  },
  thumbnail: {
    marginTop: 35,
    width: 210,
    height: 210,
    padding: 10,
    backgroundColor: '#F8F8F7',
    borderRadius: 32,
    borderColor: '#D8D8D8',
    borderWidth: 1,
    overflow: 'hidden',
  },
  thumbnailText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3D3D3D',
    textAlign: 'center',
  },
  formWrapper: {
    width: 330,
    gap: 30,
  },
  formLabel: {
    fontSize: 24,
    fontWeight: 'medium',
    color: '#3D3D3D',
  },
  formInput: {
    width: 320,
    height: 65,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    padding: 10,
    fontSize: 24,
    fontWeight: 'medium',
    color: '#3D3D3D',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3D3D3D',
    textAlign: 'right',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E4',
    padding: 20,
  },
  button: {
    width: 150,
    height: 80,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    backgroundColor: '#D8D8D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantity: {
    width: 100,
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#3D3D3D',
  },
  quantityButton: {
    width: 70,
    height: 70,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
