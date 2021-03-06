import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="content-container">
      <div class="content-title-group not-found">
        <h2 class="title">Overview</h2>
        <p>
          This project is based on the
          <a href="https://github.com/MicrosoftDocs/mslearn-staticwebapp-authentication/tree/main/angular-app"
            >MS official sample app</a
          >. The shopping theme is used throughout the app.
        </p>
        <p>
          It shows an example app that does NOT require the <code>angular-swa-auth</code> helper library to implement
          authentication. This is typically where you need to serve your app to authentication users only.
        </p>
        <br />
        <h2 class="title">Resources</h2>
        <ul>
          <li>
            <a href="https://github.com/christianacca/static-web-apps-auth/tree/master/apps/angular-swa-auth-nolib">
              Code in GitHub
            </a>
          </li>
          <li>
            <a href="https://angular-swa-auth.codingdemo.co.uk">
              Demo app that DOES use <code>angular-swa-auth</code> helper library to implement authentication
            </a>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class AboutComponent {}
