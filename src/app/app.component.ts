import { Component, OnInit } from '@angular/core';
import { PeoplePickerQuery } from "./Model/App.Model";
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

  peoplePickerQuery: PeoplePickerQuery = {
    queryParams: {
      // __metadata: {
      //   type: 'SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters'
      // },
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

  }
  onChange(res): void {

    if (this.name.length >= 3) {
      this.info = false;
      this.peoplePickerQuery.queryParams.QueryString = this.name;
      this.getUser();
    }
    else {
      this.info = true;
    }
  }

  getUser(): void {
    this._appService.getService().subscribe(
      (res) => {
        if (res.length !== 0) {
          const url = "/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser";
          this._appService.getUserSuggestions(url, {
            // 'queryParams': {
            //   '__metadata': {
            //     'type': 'SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters'
            //   },
            'MaximumEntitySuggestions': 10,
            'AllowEmailAddresses': true,
            'AllowOnlyEmailAddresses': false,
            'PrincipalSource': 15,
            'PrincipalType': 1,
            'SharePointGroupID': 0,
            'QueryString': this.name
            //}
          }, res.d.GetContextWebInformation.FormDigestValue)
            .subscribe(
              (dataresponse) => {
                if (dataresponse.length === 0) {
                } else {
                  console.log(dataresponse);
                  console.log(dataresponse);

                }
              },
              (error) => {
                console.log(error);
              });
        }
      });
  }
}

// this._http.post<any>(httpURL, this.peoplePickerQuery,
//   httpOptions1).toPromise()
//   .then(
//     data => { console.log(data); },
//     msg => { console.log(msg); }
//   );



// this._appService.getService().subscribe(
//   (res) => {
//     // console.log(res.length);
//     // console.log(res);
//     if (res.length !== 0) {
//       // console.log('res' + res.d.GetContextWebInformation.FormDigestValue);
//       // console.log('Inside Click');
//       const url = '/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.ClientPeoplePickerSearchUser';
//       this._appService.getUserSuggestions(url, this.peoplePickerQuery, res.d.GetContextWebInformation.FormDigestValue)
//         .subscribe(
//           (dataresponse) => {
//             // console.log(dataresponse.length);
//             if (dataresponse.length === 0) {
//             } else {
//               console.log(dataresponse);
//               console.log(dataresponse);

//             }
//           },
//           (error) => {
//             console.log(error);
//           });
//     } else {
//       console.log("test");
//     }
//   },
//   (error) => {
//     console.log(error);
//   });