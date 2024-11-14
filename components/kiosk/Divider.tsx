import { View } from 'react-native';

interface Props {
  marginTop?: number;
}

const Divider = ({ marginTop = 0 }: Props) => {
  return <View style={{ height: 1, backgroundColor: '#EDEDED', width: '100%', marginTop }}></View>;
};

export default Divider;
