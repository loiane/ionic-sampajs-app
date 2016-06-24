import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, Nav} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {ConferenceData} from './providers/conference-data';
import {TabsPage} from './pages/tabs/tabs';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'build/app.html'
})
class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageObj[] = [
    { title: 'Agenda', component: TabsPage, icon: 'calendar' },
    { title: 'Palestrantes', component: TabsPage, index: 1, icon: 'contacts' },
    { title: 'Local', component: TabsPage, index: 2, icon: 'map' },
    { title: 'Sobre', component: TabsPage, index: 3, icon: 'information-circle' },
  ];

  rootPage: any = TabsPage;

  constructor(
    platform: Platform,
    confData: ConferenceData
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      StatusBar.overlaysWebView(false);
      Splashscreen.hide();
    });

    // load the conference data
    confData.load();

  }

  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});

    } else {
      this.nav.setRoot(page.component);
    }
  }
}


// Pass the main App component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument, see the docs for
// more ways to configure your app:
// http://ionicframework.com/docs/v2/api/config/Config/
// Place the tabs on the bottom for all platforms
// See the theming docs for the default values:
// http://ionicframework.com/docs/v2/theming/platform-specific-styles/

ionicBootstrap(ConferenceApp, [ConferenceData], {
  tabbarPlacement: 'bottom'
});
