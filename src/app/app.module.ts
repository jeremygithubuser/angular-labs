import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwitchMapExampleComponent } from './components/switch-map-example/switch-map-example.component';
import { SwitchMapExamplesComponent } from './components/switch-map-examples/switch-map-examples.component';

@NgModule({
  declarations: [
    AppComponent,
    SwitchMapExampleComponent,
    SwitchMapExamplesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
