import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RateService } from '../data/service/rate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rateForm: FormGroup;
  ratingType: string;

  types: string[] =[];

  countGood: number;
  countBad: number;
  countNotBad: number;

  constructor(
    private service: RateService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getTypes(); 
    this.getCountGood();
    this.getCountBad();
    this.getCountNotBad();
  }

  get f(){
    return this.rateForm.controls;
  }

  createForm(){
    this.rateForm = new FormGroup({
      ratingType: new FormControl('', [Validators.required])
    });
  }

  rate(rType: string){
    this.service.rate(rType).subscribe(() => { })
  }

  getTypes(){
    this.service.getTypes().subscribe((data: string[])=>{
      this.types = data;
    }); 
  } 

  getCountGood(){
    this.service.getCountGood().subscribe((dataG: number) => {
      this.countGood = dataG;
    });
  }

  getCountBad(){
    this.service.getCountBad().subscribe((dataB: number) => {
      this.countBad = dataB;
    });
  }

  getCountNotBad(){
    this.service.getCountNotBad().subscribe((dataNB: number) => {
      this.countNotBad = dataNB;
    });
  }

  refreshPage() { 
    window.location.reload(); 
  } 

}
