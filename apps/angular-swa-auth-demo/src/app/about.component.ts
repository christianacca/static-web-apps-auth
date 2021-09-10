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
          It shows an example app that uses the <code>angular-swa-auth</code> helper library to implement
          authentication.
        </p>
        <br />
        <h2 class="title">Resources</h2>
        <ul>
          <li>
            <a href="https://github.com/christianacca/static-web-apps-auth/tree/master/apps/angular-swa-auth-demo">
              Demo app code in GitHub
            </a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/@christianacca/angular-swa-auth"> npm package: angular-swa-auth</a>
          </li>
          <li>
            <a href="https://docs.angular-swa-auth.codingdemo.co.uk/"> Library reference documentation</a>
          </li>
          <li>
            <a href="https://docs.angular-swa-auth.codingdemo.co.uk/"> Library storybook documentation</a>
          </li>
          <li>
            <a href="https://docs.angular-swa-auth.codingdemo.co.uk/">
              A demo app that does NOT use <code>angular-swa-auth</code> helper library to implement authentication</a
            >
          </li>
        </ul>
      </div>
    </div>
  `
})
export class AboutComponent {}
