import { CartItemType } from '@/constants/Product';
import { AntDesign } from '@expo/vector-icons';
import { View, StyleSheet, Text, ScrollView, Pressable, TextInput, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import Divider from './Divider';
import BaseText from './BaseText';
import React, { useState } from 'react';

interface Props {
  opened: boolean;
  onClose: () => void;
  cart_items: CartItemType[];
  total_price: number;
}

const optionKeyByText: { [key: string]: string } = {
  weight: '무게',
  container_weight: '김치통',
  quantity: '수량',
};

const ReceiptModal = ({ opened, onClose, cart_items, total_price }: Props) => {
  const [name, setName] = useState('');

  const modalColse = () => {
    setName('');
    onClose();
  };

  return (
    <Modal isVisible={opened} style={{ justifyContent: 'flex-start' }}>
      <View style={styles.modalContent}>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.title}>주문 내역</Text>
            <Pressable onPress={modalColse}>
              <AntDesign name='close' size={28} color='#878787' />
            </Pressable>
          </View>
          <Divider marginTop={20} />
          {cart_items.map((item, index) => {
            const options = JSON.parse(item.selected_options);

            return (
              <React.Fragment key={`cart_item_${index}`}>
                <View style={{ marginTop: 30, gap: 10 }}>
                  <Text style={styles.item_title}>{item.item.title}</Text>
                  {Object.keys(options)
                    .filter((filter_option) =>
                      item.item.options.includes('weight')
                        ? filter_option !== 'quantity'
                        : filter_option === 'quantity',
                    )
                    .map((option, idx) => {
                      const suffix = option === 'quantity' ? '개' : 'kg';
                      const option_value = Number(options[option]);
                      const price = item.item.price * Number(options[option]) * (option === 'quantity' ? 1 : 10);

                      if (option_value === 0) return null;

                      return (
                        <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={styles.item_option}>
                            {' '}
                            ㄴ {optionKeyByText[option]}: {options[option]}
                            {suffix}
                          </Text>
                          <Text style={styles.item_price}>
                            {' '}
                            {option === 'container_weight' ? '-' : ''}
                            {price.toLocaleString()}원
                          </Text>
                        </View>
                      );
                    })}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.item_option}>총합</Text>
                    <Text style={styles.item_price}>{item.price.toLocaleString()}원</Text>
                  </View>
                </View>
                <Divider marginTop={20} />
              </React.Fragment>
            );
          })}
          <View
            style={{
              marginTop: 30,
              marginBottom: 30,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <BaseText weight='medium' style={styles.total}>
              총 금액
            </BaseText>
            <BaseText weight='bold' style={styles.total_price}>
              {total_price.toLocaleString()}원
            </BaseText>
          </View>
        </ScrollView>
        <Divider />
        <View style={{ gap: 10, marginTop: 30 }}>
          <BaseText weight='semibold' style={{ fontSize: 20, color: '#898987' }}>
            메모
          </BaseText>
          <TextInput
            style={styles.formInput}
            value={name}
            onChangeText={(v) => setName(v)}
            placeholder='이름 또는 전화번호를 입력하세요.'
            placeholderTextColor='#D8D8D8'
          />
          <Pressable style={styles.complete_button} onPress={modalColse}>
            <BaseText weight='semibold' style={{ fontSize: 24, color: '#ffffff', textAlign: 'center' }}>
              완료
            </BaseText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ReceiptModal;

const styles = StyleSheet.create({
  modalContent: {
    width: 500,
    backgroundColor: '#ffffff',
    minHeight: 700,
    maxHeight: Dimensions.get('window').height - 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 40,
    borderRadius: 4,
    flexGrow: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3D3D3D',
  },
  item_title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3D3D3D',
  },
  item_option: {
    fontSize: 20,
    color: '#898987',
  },
  item_price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3D3D3D',
  },
  total: {
    fontSize: 32,
    color: '#3D3D3D',
  },
  total_price: {
    fontSize: 40,
    color: '#3D3D3D',
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    padding: 10,
    fontSize: 24,
    fontFamily: 'Pretendard-SemiBold',
    color: '#3D3D3D',
  },
  complete_button: {
    backgroundColor: '#C22C24',
    width: '100%',
    height: 65,
    borderRadius: 8,
    justifyContent: 'center',
  },
});
