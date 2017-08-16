import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SettingPage } from '../setting/setting';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabRoots:Object[];

  constructor() {
    this.tabRoots=[
      {
        root:HomePage,
        tabTitle:'home',
        tabIcon:'home'
      },
      {
        root: ContactPage,
        tabTitle: 'Contact',
        tabIcon: 'notifications'
      },
      {
        root: AboutPage,
        tabTitle: 'About',
        tabIcon: 'document'
      },
      {
        root:SettingPage,
        tabTitle:'setting',
        tabIcon:'gear'
      }
    ]
  }
}
