import { EApiMethods } from '../enums/e-api-methods';

export interface IApi {
  method?: EApiMethods;
  input?: any;
  url: string;
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
}
