import generatorRoutes from '../generatorRoutes';

export default class RouterLoaderService {
  private routes = [
    { path: '/index', router: generatorRoutes },
  ];
  private app: any;

  constructor(app: any) {
    this.app = app;
  }

  loadRoutes() {
    this.routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }
}
