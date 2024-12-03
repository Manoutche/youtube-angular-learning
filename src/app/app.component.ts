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
    /** dans cette fonction on met toute les fonction qui seront appelé au moment du lance ment de l'App */

    this.loadDesignation()
    this.loadRol()
    this.loadEmployee()

  }


  stepsList : any [] = [
    {
      stepName: 'Basic Details',
      progression: 8,
      isCompleted: false
    },
    {
      stepName: 'Skill',
      progression: 50,
      isCompleted: false
    },
    {
      stepName: 'Experiences',
      progression: 100,
      isCompleted: false
    },
  ]
  activeStep: any = this.stepsList[0]
  employee: any = new Employee();

  emplSkill: any = new Skill()
  emplExperience: any = new Experience()

  designationList: any [] = []
  employeeList: any [] = []
  roleList: any [] = []

  loadDesignation(){
    this.http.get('https://freeapi.gerasim.in/api/EmployeeApp/GetAllDesignation').subscribe((res:any)=>{
      if (res.result) {
        this.designationList = res.data
      }
    })
  }

  loadEmployee(){
    this.http.get('https://freeapi.gerasim.in/api/EmployeeApp/GetAllEmployee').subscribe((res:any)=>{
      if (res.result) {
        this.employeeList = res.data
      }
    })
  }

  loadRol(){
    this.http.get('https://freeapi.gerasim.in/api/EmployeeApp/GetAllRoles').subscribe((res:any)=>{
      if (res.result) {
        this.roleList = res.data
      }
    })
  }
  setActiveStep(activeStep: any) {
    this.activeStep = activeStep
  }

  gotoNexStep(){
    let currentStep =  this.stepsList.find(m => m.stepName == this.activeStep.stepName)
    currentStep.isCompleted = true
    let currentStepIndex = this.stepsList.findIndex(item => item.stepName === currentStep.stepName)

    if (currentStepIndex !== -1 && this.stepsList[currentStepIndex+1] !==undefined) {
      this.activeStep = this.stepsList[++currentStepIndex]
    }
  }
  addSkills() {
    const newSkill =  {
      empSkillId: 0,
      empId: 0,
      skill: '',
      totalYearExp: 0,
      lastVersionUsed: '',
    }
    this.employee.erpEmployeeSkills.unshift(newSkill)
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
    this.employee.ermEmpExperiences.unshift(newExperience)
  }

  saveEmployee(){
    this.http.post('https://freeapi.gerasim.in/api/EmployeeApp/CreateNewEmployee', this.employee).subscribe((res:any)=>{
      if (res.result) {
        alert('Emlpoyée enregistré avec success ')
      }
    })
  }
}
