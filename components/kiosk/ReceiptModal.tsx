import { AntDesign } from '@expo/vector-icons';
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  opened: boolean;
  onClose: () => void;
}

const ReceiptModal = ({ opened, onClose }: Props) => {
  return (
    <Modal isVisible={opened} style={{ justifyContent: 'flex-start' }}>
      <ScrollView style={styles.modalContent}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.title}>주문 내역</Text>
          <Pressable>
            <AntDesign name='close' size={28} color='#878787' />
          </Pressable>
        </View>
        <View style={{ height: 1, backgroundColor: '#EDEDED', width: '100%', marginTop: 20 }}></View>
        <View style={{ marginTop: 30, gap: 10 }}>
          <Text style={styles.item_title}>배추 김치</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.item_option}> ㄴ 무게: 12.6kg</Text>
            <Text style={styles.item_price}> 102,000원</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.item_option}> ㄴ 김치통: 3.6kg</Text>
            <Text style={styles.item_price}> -3,000원</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.item_option}> 총합</Text>
            <Text style={styles.item_price}> 96,000원</Text>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#EDEDED', width: '100%', marginTop: 20 }}></View>
        <View style={{ marginTop: 30, gap: 10 }}>
          <Text style={styles.item_title}>배추 김치</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.item_option}> ㄴ 무게: 12.6kg</Text>
            <Text style={styles.item_price}> 102,000원</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.item_option}> ㄴ 김치통: 3.6kg</Text>
            <Text style={styles.item_price}> -3,000원</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.item_option}> 총합</Text>
            <Text style={styles.item_price}> 96,000원</Text>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ReceiptModal;

const styles = StyleSheet.create({
  modalContent: {
    width: 500,
    backgroundColor: '#ffffff',
    minHeight: 700,
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
});
