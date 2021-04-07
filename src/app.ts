import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';


export class App {

  router: Router;
  

    configureRouter(config: RouterConfiguration, router: Router){
      config.title = 'Asset';
      config.options.pushState = true;
      config.options.root = '/';
      config.map([
        { route: '',              moduleId: PLATFORM.moduleName('home'),   title: 'Home',name:'home' },
        { route: 'createasset',  moduleId: PLATFORM.moduleName('createasset'), name:'createasset' }
      ]);
  
      this.router = router;
    }
  
  
   // public message = 'Hello World!';
}
