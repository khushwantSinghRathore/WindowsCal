import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    Keyboard.hide();
    this.startApp();
  }

   startApp(){
    this.platform.ready().then(() => {

      setTimeout(async () => {
        await SplashScreen.hide();
      }, 200);

    });

  }

}
