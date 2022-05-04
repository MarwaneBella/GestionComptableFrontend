import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User = new User();
  constructor(private userService : UserService, private rooter: Router) { }

  ngOnInit(): void {
    
  }

  onSubmit(){
    this.userService.loging(this.user).subscribe(data =>{

      this.goToHome();
    },
    error =>{
      alert("Incorrect username or password.");
    });

  }

  goToHome(){
    this.rooter.navigate(['/home']);
  }

}
