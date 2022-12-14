import {Component} from "@angular/core"
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {NavigateService, SessionService} from "../../core/services/common"
import {Credentials} from "../../model/auth"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form: FormGroup
  hidePassword: boolean = true
  error: string | undefined
  constructor(private formBuilder: FormBuilder, 
    private sessionService: SessionService,
    private navigation: NavigateService) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: [''],
      keepLogged: [true]
    })
  }

  onLogin(credentials: Credentials) {
    if(!this.form.valid){
      return
    }
    this.sessionService.login(credentials)

      .subscribe(({hasError, error}) => {
        if(hasError){
          this.error = error
        }
        this.navigation.toMain()
      })
  }

}
