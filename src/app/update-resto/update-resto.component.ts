import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RestoService } from '../resto.service';


@Component({
  selector: 'app-update-resto',
  templateUrl: './update-resto.component.html',
  styleUrls: ['./update-resto.component.css']
})
export class UpdateRestoComponent implements OnInit {

    alert: boolean=false;

  constructor(private router: ActivatedRoute, private resto: RestoService) { }

  editResto = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl('')
  })

  ngOnInit(): void {
    //console.log(this.router.snapshot.params.id )
    this.resto.getCurrentResto(this.router.snapshot.params.id).
      subscribe((result: any) => {
        //console.log(result)
        this.editResto = new FormGroup({
          name: new FormControl(result['name']),
          email: new FormControl(result['email']),
          address: new FormControl(result['address'])
        })
      })
  }

  submit() {
    //console.log(this.editResto.value)
    this.resto.updateResto(this.router.snapshot.params.id,this.editResto.value).       // id,data are passed
    subscribe(result => console.log(result))
    this.alert= true
  }

  closeAlert(){
    this.alert=false
  }

}
