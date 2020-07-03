import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DialogsDataService } from '../../../services/dialogs.data.service';
import { MenuItemsService } from '../../../services/menu.items.service';

@Component({
  selector: 'app-usuarios-result',
  templateUrl: './usuarios-result.component.html',
  styleUrls: ['./usuarios-result.component.scss']
})
export class UsuariosResultComponent {
  routingPath = 'Configuracion/Usuarios';
  @Input('resultLst') resultLst: any;
  @Input('path') path: string; 
  @Output() onEditQuery = new EventEmitter<any>();
  @Input('status') status: number;
  
  isDelete = true;
  isUnLock = true;
  isedit = true;
  isdelete = true;
  
  constructor(private dialogsService : DialogsDataService, private menurights : MenuItemsService) { 
    /*
    if (menurights.menuItemsRights[this.routingPath].isdelete == 1) {
      this.isdelete = true;
    }
    if (menurights.menuItemsRights[this.routingPath].isedit == 1) {
      this.isedit = true;
    }*/
  }

  edicionConsulta(idValue, typeValue, email) {
    var model = { 
      id : idValue._id, 
      editQuery : typeValue
    };
    if (typeValue == 2) {
      model["email"] = email;
    }
    
    this.onEditQuery.emit(model);
   
  }

  isGotoDelete() {
    this.isDelete = true;
  }

  delete(id) {
    this.lockUnlock(1, id);
  }

  lockUnlock(status, id) {
    var model = {
      id : id._id,
      rev : id._rev
    };
    this.dialogsService.deleteWebservices(this.path, model, 1)
    .then( data => {
        for (var x = 0; x < this.resultLst.length; x++) {
          var tmp = this.resultLst[x] as any;
          if (tmp.doc._id == model.id) {
            console.log("aqui");
            this.resultLst.splice(x, 1);
            break;
          } 
        }
    });
  }

  undo() {
    this.isDelete = false;
  }

  undoUnlock() {
    this.isDelete = true;
    this.isUnLock = false;
  }

  unlock(res) {
    if (!this.isUnLock) {
      this.isDelete = false;
      this.isUnLock = true;
    }
    else {
      this.lockUnlock(0, res)
    }
    
  }

}
