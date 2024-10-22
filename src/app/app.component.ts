import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './models/employee.model';
import { Skill } from './models/skill.model';
import { Experience } from './models/experience.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
addSkills() {
throw new Error('Method not implemented.');
}
addExperience() {
throw new Error('Method not implemented.');
}
  setActiveStep(activeStep: any) {
    this.activeStep = activeStep
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
  employee: any = Employee
  skill: any = Skill
  experience: any = Experience
}
