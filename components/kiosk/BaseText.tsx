import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

interface Props {
  weight?: string;
  style?: StyleProp<TextStyle>;
  children: any;
}

const BaseText = ({ weight, style, children }: Props) => {
  return <Text style={[weight ? styles[weight] : styles.regular, style]}>{children}</Text>;
};

export default BaseText;

const styles: { [key: string]: { [key: string]: string } } = StyleSheet.create({
  thin: {
    fontFamily: 'PretendardThin',
  },
  light: {
    fontFamily: 'PretendardLight',
  },
  regular: {
    fontFamily: 'PretendardRegular',
  },
  semibold: {
    fontFamily: 'PretendardSemiBold',
  },
  bold: {
    fontFamily: 'PretendardBold',
  },
  medium: {
    fontFamily: 'PretendardMedium',
  },
});
