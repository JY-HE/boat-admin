declare module 'element-resize-detector' {
    export interface ResizeDetector {
      listenTo(element: HTMLElement, callback: () => void): void;
      removeListener(element: HTMLElement, callback: () => void): void;
      uninstall(element: HTMLElement): void;
    }
  
    function elementResizeDetectorMaker(options?: { strategy: 'scroll' | 'object' }): ResizeDetector;
  
    export default elementResizeDetectorMaker;
  }
  