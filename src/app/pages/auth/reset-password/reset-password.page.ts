import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormComponent, JsonFormData } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import * as _ from 'lodash-es';
import { CommonRoutes } from 'src/global.routes';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { ToastService } from 'src/app/core/services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  @ViewChild('form1') form1: DynamicFormComponent;
  formData: JsonFormData = {
    controls: [
      {
        name: 'email',
        label: 'Email',
        value: '',
        class: 'ion-margin',
        type: 'email',
        position: 'floating',
        validators: {
          required: true,
          email: true
        },
      },
      {
        name: 'password',
        label: 'Enter Password',
        value: '',
        class: 'ion-margin',
        type: 'password',
        position: 'floating',
        validators: {
          required: true,
        },
      },
      {
        name: 'newPassword',
        label: 'Confirm Password',
        value: '',
        class: 'ion-margin',
        type: 'password',
        position: 'floating',
        validators: {
          required: true,
        },
      },
    ],
  };
  showPassword = false;
  public headerConfig: any = {
    // menu: true,
    backButton: {
      label: '',
    },
    notification: false,
    headerColor: 'white',
  };

  constructor(private router: Router, private profileService: ProfileService, private toastService: ToastService) { }

  ngOnInit() {
  }
  togglePassword() {
    let type = this.showPassword ? 'password' : 'text';
    _.forEach(this.formData.controls, (data) => {
      if (data.type === type) {
        data.type = !this.showPassword ? 'password' : 'text';;
      }
    });
  }

  async onSubmit() {
    let formJson = this.form1.myForm.value;
    if (this.form1.myForm.valid) {
      if (_.isEqual(formJson.password, formJson.newPassword)) {
        var response = await this.profileService.generateOtp({ email: this.form1.myForm.value.email });
        if (response) {
          this.router.navigate([`/${CommonRoutes.AUTH}/${CommonRoutes.OTP}`], { queryParams: { email: formJson.email, password: formJson.password, newPassword: formJson.newPassword } });
        }
      } else {
        this.toastService.showToast('Password Mismatch', 'danger');
      }
    }
  }
}
