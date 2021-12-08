import axios from 'axios';
import type { AxiosInstance } from 'axios';

const httpService = axios.create({
  baseURL: 'https://correios.contrateumdev.com.br/api',
});

type CorreiosServiceResponse = {
  objeto: {
    evento: {
      descricao: string;
      dataPostagem: string;
      data: string;
      hora: string;
    }[];
  }[];
};

enum CorreiosTypes {
  LS = 'LS',
}

class CorreiosService {
  constructor(private readonly httpService: AxiosInstance) {}

  async findPackageDetails(code: string): Promise<CorreiosServiceResponse> {
    const { data } = await this.httpService.post('/rastreio', {
      code,
      type: CorreiosTypes.LS,
    });

    return data;
  }
}

const deliveryService = new CorreiosService(httpService);

export { deliveryService, CorreiosServiceResponse, CorreiosTypes };
