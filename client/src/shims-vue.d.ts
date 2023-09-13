declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.vue-router' {
  import { VueRouter, RouteConfig } from 'vue-router'
  export default { VueRouter, RouteConfig };
}

declare module '*.vuex' {
  import Vuex from 'vuex'
  export default Vuex;
}

declare module 'process' {
  import { memoryUsage } from 'process';
  export default memoryUsage;
}