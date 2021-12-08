import React from 'react';
import { TextInputProps } from 'react-native';

import { SvgProps } from 'react-native-svg';
import { Container, Content, Divider, InputText } from './styles';

interface Props extends TextInputProps {
  icon: React.FC<SvgProps>;
}

export const Input: React.FC<Props> = ({ icon: Icon, ...props }) => (
  <Container>
    <Content>
      <Icon />
      <Divider />
      <InputText {...(props as any)} />
    </Content>
  </Container>
);
