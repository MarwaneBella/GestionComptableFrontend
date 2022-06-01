import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User = new User();
  isLoggedIn:boolean = false;
  isCorrect:boolean = true;
  isChecked :boolean = false ;
  constructor(private userService: UserService,
    private userAuthService:  UserAuthService,
    private router: Router) { }

  ngOnInit(): void {
    
    
    
  }
  CheckBox(){
    console.log(this.isChecked)
  }

  onSubmit(){
    
    this.userService.loging(this.user).subscribe((response :any)=>{

      this.userAuthService.setRoles(response.user.role);
      this.userAuthService.setToken(response.jwtToken);
      this.userAuthService.setUserName(response.user.userName);

        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigateByUrl('');
        } else {
          this.router.navigateByUrl('');
        }
    },
    error =>{
      if(error.status == 0){
        this.router.navigateByUrl('/error500');
      }
      if(error.status == 401){
        this.isCorrect = false;
      }
    });

  }

  

}
