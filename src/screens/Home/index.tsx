import React, { useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import {
  Container,
  Content,
  InputField,
  Input,
  PackageCount,
  PackageList,
  InputButton,
} from './styles';

import { PackageCard } from '@/components/PackageCard';
import { useGetCurrentUserPackages } from '@/services/react-query/queries/userGetuserPackages';
import { useCreatePackage } from '@/services/react-query/mutations/useCreatePackage';
import AddIcon from '@/assets/plus.svg';
import { Navbar } from '@/components/Navbar';
import { useToast } from '@/hooks/useToast';
import strings from '@/locales/strings';
import { deliveryService } from '@/services/delivery/correios';

export type Package = {
  code: string;
  id: string;
  name: string;
  departureData: string;
  eventDate: string;
  eventHour: string;
  status: string;
};

export const Home: React.FC = () => {
  const notify = useToast();
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const { packages } = useGetCurrentUserPackages();
  const createPackage = useCreatePackage();
  const client = useQueryClient();

  async function handleSubmit() {
    try {
      if (!input.trim()) {
        notify.error('O Código da entrega é obrigatário');
        return;
      }

      if (createPackage.isLoading) return;

      const { objeto } = await deliveryService.findPackageDetails(input);

      const packageDetails = objeto[0].evento[0];

      await createPackage.mutateAsync({
        code: input,
        status: packageDetails.descricao,
        departureDate: packageDetails.dataPostagem,
        name: input,
      });

      await client.invalidateQueries('getCurrentUserPackagesRequest');

      notify.success(strings.package.createPackageSucess);
    } catch (e) {
      notify.error(strings.package.createPackageError);
    }
  }

  return (
    <>
      <Navbar pageTitle="Entregas" />
      <Container>
        <Content>
          <InputField onTouchStart={() => inputRef.current?.focus()}>
            <Input
              ref={inputRef}
              placeholder="Anexar entrega"
              value={input}
              onChangeText={(value) => setInput(value)}
            />
            <InputButton onPress={handleSubmit}>
              <AddIcon />
            </InputButton>
          </InputField>

          <PackageCount>
            {packages
              ? `${(packages as any).length} pacote(s)`
              : 'Não há pacotes'}
          </PackageCount>

          <PackageList
            // @ts-ignore
            keyExtractor={(item) => item.id}
            data={(packages as Package[]) || []}
            renderItem={({ item }) => <PackageCard packageData={item} />}
          />
        </Content>
      </Container>
    </>
  );
};
