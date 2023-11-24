import { Component, OnInit, ViewChild, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Response, Selectors,DocumentType, DataUser } from '../../interfaces';
import { Subject } from 'rxjs';
import { CryptographyService } from 'src/app/services/cryptography.service';
import { SharedService } from 'src/app/services/shared-services.service';




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  

  private fb = inject(FormBuilder)
  private cryptographyService = inject(CryptographyService);
  private readonly userService = inject(UserService);
  private _selectors = signal<Selectors|boolean>(true);
  private _userlist = signal<DataUser[]|null>([])
  
  private _title:string ="";

  public dtOptions: DataTables.Settings = {};
  public dtTrigger:Subject<any> = new Subject<any>();
  public labelBtn: string = "";
  public isLoadingTable = true;
  public isSavingUSer = false;
  public user:DataUser|null = null;
  public documentTypeId:number =0;
  public table:any;

  @ViewChild('closebutton') closebutton:any;
  @ViewChild('openbutton') openbutton:any;
  

  ngOnInit(): void {
    this.sharedService.setShowSpinner(true);
    this.loadDataStart();  
    this.labelBtn = "Guardar";

    this.dtOptions = {
      pagingType:"full_numbers",
      pageLength: 10,
      language:{
        searchPlaceholder:"Buscar en la tabla"
      },
      responsive:true    
    }; 
    
    
    this.getAllUser();

  }
 
  title:string ="Usuarios";
  

  public documentTypeSelector = computed(() => this._selectors);
  

  public userList = computed(() => this._userlist());
  public selects = computed(() => this.userService.dataSelectors());

  constructor(private sharedService:SharedService)
  {
  }
  public userForm:FormGroup = this.fb.group(
    {
      id:["",[]],
      documentTypeId: ["0",[Validators.required, Validators.min(0)]],
      documentNumber: ["",[Validators.required]],
      fullName: ["",[Validators.required]],
      lastName1: ["",[Validators.required]],
      lastName2: ["",],
      genderId:["",[Validators.required,, Validators.min(0)]],
      email: ["",[Validators.required, Validators.email]],
      companyId: ["",[Validators.required, Validators.min(0)]],
      status: ["",[Validators.required, Validators.min(0)]],
      phoneNumber: ["",[Validators.required, Validators.min(0)]],
    })
    

    isValidField(field:string): boolean |null
    {
      return this.userForm.controls[field].errors && this.userForm.controls[field].touched
    }

    validClass(field:string)
    {
      return {'is-invalid': this.userForm.controls[field].errors && this.userForm.controls[field].touched, 'is-valid': !this.userForm.controls[field].errors}
    }

    getFieldError(field:string):string | null
    {
      if(!this.userForm.controls[field] ) return null;
      const errors = this.userForm.controls[field].errors || {};

      for (const key of Object.keys(errors)) {
        
        switch(key)
        {
          case 'required':
            return "Este campo es obligatorio";
          case 'email':
            return "El email no tiene un formato valido";
          case 'min':
            return "El valor no puede ser negativo";
        }
      }
      return null;

    }

    public save():void
    {
      this.isSavingUSer = true;
      if(this.userForm.invalid) {
        this.userForm.markAllAsTouched();
        return;
      };
      
      const data = this.cryptographyService.encrypt(JSON.stringify(this.userForm.value));
      this.userService.saveUser(data)
      .subscribe({
        next:((res) =>{
          this.isSavingUSer = false;
          this.closebutton.nativeElement.click();
          this.userForm.reset();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          })
        }),
        error:(error)=>
        {
          this.isSavingUSer = false;
          if(error.statusCode == 400) 
          {
            Swal.fire(error.message,error.messageError,'error');
          }else{
            Swal.fire("Error en el servicio","Ocurrio un error en el servicio",'error');
          }
        }
      })
      
    }

    public resetForm():void{
      this.userForm.reset();
    }
  
 
  //public allUser = computed(() => this.userService.allUser());
    loadDataStart()
    {
      this.sharedService.setShowSpinner(true);
      this.userService.dataStart()
      .subscribe({
        next: ((res) =>{
          //console.log(res);
          this.sharedService.setShowSpinner(false);
          this._selectors.set(res);
          
        //  console.log("Selectors: ",this._selectors());
        }), 
        error: (error) => {
          this.sharedService.setShowSpinner(false);
          if(error.status)
          {
            Swal.fire(error.message,error.errorMessage,'error');
          }else{
            Swal.fire("Error en el servicio","Ocurrio un error en el servicio",'error');
          }
        }
      })

    }

    getAllUser()
    {
      this.isLoadingTable = true;
      this.userService.getAllUsers()
      .subscribe({
        next: ((users) =>{
          
          this._userlist.set(users);
          this.dtTrigger.next(null);
          this.isLoadingTable = false;
        }), 
        error: (error) => {
          this.isLoadingTable = false;
          if(error.status)
          {
            Swal.fire(error.message,error.errorMessage,'error');
          }else{
            Swal.fire("Error en el servicio","Ocurrio un error en el servicio",'error');
          }
        }
      })

    }
    
    nuevo()
    {
      this.user= null;
      this.userForm.reset();
    }

    editUser(userEdit:DataUser){
      this.user = null;
      this.userForm.reset();
      this.user = userEdit;
      this.openbutton.nativeElement.click();

    }

    disable(user:DataUser)
    {
      this.sharedService.setShowSpinner(true);
      const data = this.cryptographyService.encrypt(JSON.stringify(user));
      this.userService.diableUser(data)
      .subscribe({
        next: ((res) =>{
          
          this.sharedService.setShowSpinner(false);
          this.table = $('#tableUser').DataTable( {
            paging: false
        } );
         
        this.table.destroy();
          this.getAllUser();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          })
        }), 
        error: (error) => {
          this.sharedService.setShowSpinner(false);
          if(error.status)
          {
            Swal.fire(error.message,error.errorMessage,'error');
          }else{
            Swal.fire("Error en el servicio","Ocurrio un error en el servicio",'error');
          }
        }
      })
    }
}
