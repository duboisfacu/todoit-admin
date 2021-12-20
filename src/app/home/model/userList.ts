import { Rol } from './rol';
import { Vehicle } from './vehicle';

export interface UserList {
  id?: number;
  email: string;
  fullName: string;
  address: string;
  cellPhone: string;
  isAccepted?: boolean;
  isDeleted?: boolean;
  observations?: string;
  password: string;
  vehicle: Vehicle;
  rol: Rol;
}
