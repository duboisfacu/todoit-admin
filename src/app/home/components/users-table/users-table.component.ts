import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, NavigationEnd } from '@angular/router';
import { UserList } from 'src/app/home/model/userList';
import Swal from 'sweetalert2';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.sass'],
})
export class UsersTableComponent implements OnInit {
  public loading = true;
  public page = true;
  public isClient?: boolean;
  public isDelivery?: boolean;
  public isAdmin?: boolean;
  public isAll?: boolean;
  public type: UserList[] = [];
  public type2: UserList[] = [];
  public cross!: boolean;
  public modify!: FormGroup;
  public Usertype!: number;
  public isVehicle!: boolean;
  displayStyle = 'none';
  displayStyleDelete = 'none';
  public userToDelete!: UserList;
  constructor(
    private user: UsersService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  openPopup(user: UserList) {
    this.isVehicle = user.vehicle !== null ? false : true;
    this.modify = this.fb.group({
      id: new FormControl(user.id, null),
      fullName: new FormControl(user.fullName, [Validators.required]),
      email: new FormControl(user.email, [Validators.required]),
      password: new FormControl(user.password, null),
      address: new FormControl(user.address, [Validators.required]),
      cellPhone: new FormControl(user.cellPhone, [Validators.required]),
      rol: new FormControl(user.rol.id, Validators.required),
      vehicle: new FormControl(
        user.rol.id === 2 && user.vehicle ? user.vehicle.id : null,
        user.rol.id === 2 ? Validators.required : null
      ),
    });

    this.Usertype = user.rol.id;
    this.displayStyle = 'block';
    console.log(user.fullName);
  }
  openDeletePopup(user: UserList) {
    this.userToDelete = user;
    this.displayStyleDelete = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
    this.displayStyleDelete = 'none';
  }
  public navigationEnd = this.router.events.subscribe((val) => {
    this.loading = true;
    this.page = true;
    if (this.router.url === '/home/users') {
      this.page = false;
    }

    this.type = [];
    if (val instanceof NavigationEnd) {
      this.isAdmin = false;
      this.isAll = false;
      this.isClient = false;
      this.isDelivery = false;
      if (this.router.url === '/home/users/cliente') {
        this.isClient = true;
        this.onLoad(3);
      } else if (this.router.url === '/home/users/cadete') {
        this.isDelivery = true;
        this.onLoad(2);
      } else if (this.router.url === '/home/users/admin') {
        this.isAdmin = true;
        this.onLoad(1);
      } else if (this.router.url === '/home/users/todos') {
        this.isAll = true;
        this.onLoad();
      } else {
        this.type = [];
      }
    }
  });

  onChange(search: string) {
    if (search === '') {
      this.cross = false;
    } else {
      this.cross = true;
    }

    const filteredData = this.type.filter((value: UserList) => {
      const searchStr = search.toLowerCase();
      let fullNameMatches = false;
      let addressMatches = false;
      let cellPhoneMatches = false;
      let emailMatches = false;
      let vehicleMatches = false;
      let rolMatches = false;

      fullNameMatches = value.fullName.toLowerCase().includes(searchStr);
      addressMatches = value.address.toLowerCase().includes(searchStr);
      cellPhoneMatches = value.cellPhone.toLowerCase().includes(searchStr);
      emailMatches = value.email.toLowerCase().includes(searchStr);

      // vehicleMatches = value.vehicle.name
      //   ? value.vehicle?.name?.toLowerCase().includes(searchStr)
      //   : false;
      // // rolMatches = value.rol.name
      // //   ? value.rol?.name?.toLowerCase().includes(searchStr)
      // //   : false;

      return (
        fullNameMatches ||
        addressMatches ||
        cellPhoneMatches ||
        emailMatches ||
        vehicleMatches ||
        rolMatches
      );
    });
    this.type2 = filteredData;
    return true;
  }
  deleteUser() {
    let user: UserList = {
      id: this.userToDelete.id,
      email: this.userToDelete.email,
      fullName: this.userToDelete.fullName,
      address: this.userToDelete.address,
      cellPhone: this.userToDelete.cellPhone,
      password: this.userToDelete.password,
      isDeleted: true,
      rol: {
        id: this.userToDelete.rol.id,
      },
      vehicle: {
        id: 0,
      },
    };
    if (this.modify.value.rol === 2) {
      user.vehicle = { id: this.userToDelete.vehicle.id };
    }
    this.user.post(user).subscribe((res) => {
      console.log(res);
    });
    this.router.navigateByUrl(this.router.url).then(() => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    });
    this.closePopup();
    Swal.fire({
      title: 'Usuario eliminado correctamente!',
      icon: 'success',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#FD611A',
    });
  }
  submitForm() {
    let user: UserList = {
      id: this.modify.value.id,
      email: this.modify.value.email,
      fullName: this.modify.value.fullName,
      address: this.modify.value.address,
      cellPhone: this.modify.value.cellPhone,
      password: this.modify.value.password,
      rol: {
        id: this.modify.value.rol,
      },
      vehicle: {
        id: 0,
      },
    };
    if (this.modify.value.rol === 2) {
      user.vehicle = { id: this.modify.value.vehicle };
    }
    this.user.post(user).subscribe((res) => {
      console.log(res);
    });
    this.router.navigateByUrl(this.router.url).then(() => {
      this.router.navigated = false;
      this.router.navigate([this.router.url]);
    });

    this.closePopup();
    Swal.fire({
      title: 'Usuario modificado correctamente!',
      icon: 'success',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#FD611A',
    });
  }

  onLoad(rol?: number) {
    this.user.get().subscribe((resp) => {
      this.loading = false;
      // console.log(resp);
      resp = resp.filter((type) => {
        return type.isDeleted === false;
      });
      console.log(resp);
      if (rol) {
        this.type = resp.filter((type) => {
          return type.rol.id === rol;
        });
      } else {
        this.type = resp;
      }
      this.type2 = this.type;
      // console.log(this.type);
    });
  }

  ngOnInit(): void {
    if (this.router.url === '/home/users') {
      this.page = false;
    }

    this.modify = this.fb.group({
      id: new FormControl('', null),
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', null),
      address: new FormControl('', [Validators.required]),
      cellPhone: new FormControl('', [Validators.required]),
      rol: new FormControl('', Validators.required),
      vehicle: new FormControl('', Validators.required),
    });
  }
}
