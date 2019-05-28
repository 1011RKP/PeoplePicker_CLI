import { Component, OnInit, HostListener } from '@angular/core';
import { PeoplePickerQuery, PeoplePickerUser } from "./Model/App.Model";
import { AppService } from "./app.service";
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name: string = 'Angular';
  info: boolean = false;
  public users: PeoplePickerUser[];

  peoplePickerQuery: PeoplePickerQuery = {
    queryParams: {
      QueryString: '',
      MaximumEntitySuggestions: 10,
      AllowEmailAddresses: true,
      AllowOnlyEmailAddresses: false,
      PrincipalSource: 15,
      PrincipalType: 1,
      SharePointGroupID: 0
    }
  };


  constructor(
    private _appService: AppService,
    private _http: HttpClient
  ) { }

  ngOnInit() {
    this.users = [];
  }


  onChange(res): void {
    res.preventDefault();
    if (this.name.length >= 3) {
      this.peoplePickerQuery.queryParams.QueryString = "";
      this.info = false;
      this.peoplePickerQuery.queryParams.QueryString = this.name;
      this.getUser();
    }
    else {
      this.info = true;
    }
  }

  getUser(): void {
    this._appService.getUserSuggestions(this.peoplePickerQuery)
      .subscribe(
        (res) => {
          this.users = [];
          const allUsers: PeoplePickerUser[] = JSON.parse(res.d.ClientPeoplePickerSearchUser);
          allUsers.forEach(user => {
            this.users = [...this.users, user];
          });
        },
        (error) => {
          console.log(error);
        });
  }
}
