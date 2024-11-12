import Modal from 'react-native-modal';
import { StyleSheet, View, Text, Image, TextInput, Button, Pressable } from 'react-native';

interface Props {
  opened: boolean;
  onClose: () => void;
}

const ProductModal = ({ opened, onClose }: Props) => {
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
                <Image
                  source={require('../../assets/images/logo.png')}
                  style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                />
              </View>
              <View>
                <Text style={styles.thumbnailText}>배추김치</Text>
                <Text style={styles.thumbnailText}>1kg 8000원</Text>
              </View>
            </View>
            <View style={styles.formWrapper}>
              <View style={{ marginTop: 35 }}>
                <Text style={styles.formLabel}>무게 입력(단위: kg)</Text>
                <TextInput inputMode={'numeric'} style={styles.formInput} />
              </View>
              <View>
                <Text style={styles.formLabel}>김치통 무게 입력(단위: kg)</Text>
                <TextInput inputMode={'numeric'} style={styles.formInput} />
              </View>
              <View>
                <Text style={styles.price}>총 가격: 18,000원</Text>
              </View>
            </View>
          </View>
          {/* 버튼 영역 */}
          <View style={styles.buttonWrapper}>
            <Pressable style={styles.button} onPress={() => onClose()}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#3D3D3D' }}>취소</Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#3D3D3D' }}>담기</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProductModal;

const styles = StyleSheet.create({
  modalContent: {
    width: 700,
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
    bottom: 40,
    right: 20,
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
});
