import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './models/employee.model';
import { Skill } from './models/skill.model';
import { Experience } from './models/experience.model';
import { FormsModule } from '@angular/forms';
import {  HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor (private http: HttpClient){

  }

  ngOnInit(): void {

  }


  stepsList : any [] = [
    {
      stepName: 'Basic Details',
      isCompleted: false
    },
    {
      stepName: 'Skill',
      isCompleted: false
    },
    {
      stepName: 'Experiences',
      isCompleted: false
    },
  ]
  activeStep: any = this.stepsList[0]
  employee: any = new Employee();

  emplSkill: any = new Skill()
  emplExperience: any = new Experience()

  designationList: any [] = []
  roleList: any [] = []

  loadDesignation(){
    this.http.get('https://freeapi.gerasim.in/api/EmployeeApp/GetAllDesignation').subscribe((res:any)=>{
      if (res.result) {

        this.designationList = res.data
      }
    })
  }

  loadRol(){
    this.http.get('https://freeapi.gerasim.in/api/EmployeeApp/GetAllRolle')
  }
  setActiveStep(activeStep: any) {
    this.activeStep = activeStep
  }
  addSkills() {
    const newSkill =  {
      empSkillId: 0,
      empId: 0,
      skill: '',
      totalYearExp: 0,
      lastVersionUsed: '',
    }
    this.employee.emplSkills.unshift(newSkill)
  }
  addExperience() {
    const newExperience = {
      empExpId: 0,
      empId: 0,
      companyName: '',
      startDate: '',
      endDate: '',
      designation: '',
      projectsWorkedOn:  ''
    }
    this.employee.emplExperiences.unshift(newExperience)
  }

  saveEmployee(){
    this.http.post('https://freeapi.gerasim.in/api/EmployeeApp/CreateNewEmployee', this.employee).subscribe((res:any)=>{
      if (res.result) {
        alert('Emlpoyée enregistré avec success ')
      }
    })
  }
}
