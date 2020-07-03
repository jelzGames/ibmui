import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WebservicesService } from './webservices.service';
import { ModalspinnerComponent } from '../shared/modalspinner/modalspinner.component';
import { ModalsaveComponent } from '../shared/modalsave/modalsave.component';
import { DialogSnackService } from './dialog.snack.service';

@Injectable({
  providedIn: 'root'
})
export class DialogsDataService {

  constructor(public dialog: MatDialog, private webservices: WebservicesService, private snack : DialogSnackService ) { }

  createView(view) {
    if (view == 0) {
      view = ModalsaveComponent;
    }
    let dialogRef = this.dialog.open(view,  {
      width: '265px',
      disableClose: true,
      panelClass: 'spinner-dialog'
      //data: { name: this.name, animal: this.animal }
    });
    return dialogRef;
  }

  runWebservices(path, model, type) : any {
    let dialogRef = this.createView(ModalspinnerComponent);
    return this.webservices.postMessage(path, model)
    .then( data => {
      dialogRef.close();
      if (data == null) {
        if (type == 0) {
          this.snack.showSnack("Registro ha sido gurdado con exito ");
        }
      }
      return data;
    }).catch( err => {
      dialogRef.close();
    });
  }

  postWebservices(path, model, type) : any {
    let dialogRef = this.createView(ModalspinnerComponent);
    return this.webservices.postMessage(path, model)
    .then( data => {
      dialogRef.close();
      if (data == null) {
        if (type == 0) {
          this.snack.showSnack("Operation succesfull! ");
        }
      }
      return data;
    }).catch( err => {
      dialogRef.close();
    });
  }

  putWebservices(path, model, type) : any {
    let dialogRef = this.createView(ModalspinnerComponent);
    return this.webservices.putMessage(path, model)
    .then( data => {
      dialogRef.close();
      if (data == null) {
        if (type == 0) {
          this.snack.showSnack("Operation succesfull! ");
        }
      }
      return data;
    }).catch( err => {
      dialogRef.close();
    });
  }

  deleteWebservices(path, model, type) : any {
    let dialogRef = this.createView(ModalspinnerComponent);
    return this.webservices.deleteMessage(path, model)
    .then( data => {
      dialogRef.close();
      if (data == null) {
        if (type == 0) {
          this.snack.showSnack("Operation succesfull! ");
        }
      }
      return data;
    }).catch( err => {
      dialogRef.close();
    });
  }
  
  getAllWebservices(path) : any {
    let dialogRef = this.createView(ModalspinnerComponent);
    return this.webservices.getAllMessage(path)
    .then( data => {
      dialogRef.close();
      return data;
    }).catch( err => {
      dialogRef.close();
    });
  }

  getWebservices(path, id) : any {
    let dialogRef = this.createView(ModalspinnerComponent);
    return this.webservices.getMessage(path, id)
    .then( data => {
      dialogRef.close();
      return data;
    }).catch( err => {
      dialogRef.close();
    });
  }
 

  checkError(newForm) {
    if (!newForm.valid) {
      for (var control in  newForm.controls) {
        if (newForm.controls[control].invalid) {
          if (newForm.controls[control]['tagname'] != undefined) {
            control = newForm.controls[control]['tagname'];
          }
          this.snack.showSnack("Invalid value in " + control);
          return true;
        }
      }
    }
    return false;
  }
}
