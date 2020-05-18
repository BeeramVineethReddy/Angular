import { Component } from '@angular/core';
/*this import allows us to define a component decorator
 and apply to a class
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  /*
      app-root can be applied in the index.html page as a tag
      <app-root></app-root>
  */
})
export class AppComponent {
  title = 'conFusion';
}
