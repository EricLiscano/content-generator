import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    interface Element extends VNode { }
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }

  namespace NodeJS {
    interface Process {
      browser: boolean
    }
    interface Global {
      process: Process
    }
  }
}

