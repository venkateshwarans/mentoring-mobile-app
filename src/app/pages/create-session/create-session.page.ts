import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  DynamicFormComponent,
  JsonFormData,
} from 'src/app/shared/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.page.html',
  styleUrls: ['./create-session.page.scss'],
})
export class CreateSessionPage implements OnInit {
  @ViewChild('form1') form1: DynamicFormComponent;

  public headerConfig: any = {
    // menu: true,
    backButton: {
      label: 'Create Session',
    },
    notification: false,
    headerColor: 'white',
  };

  public formData: JsonFormData;
  constructor(private http: HttpClient, private api: HttpService) { }
  async ngOnInit() {
    this.http
      .get('/assets/dummy/createSession-form.json')
      .subscribe((formData: JsonFormData) => {
        this.formData = formData;
      });
  }

  onSubmit() {
    this.form1.onSubmit();
  }

  resetForm() {
    this.form1.reset();
  }


}
