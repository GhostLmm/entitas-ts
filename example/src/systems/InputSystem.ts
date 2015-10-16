﻿module example {

  import Pool = entitas.Pool;
  import ISetPool = entitas.ISetPool;
  import IComponent = entitas.IComponent;
  import IExecuteSystem = entitas.IExecuteSystem;
  import IInitializeSystem = entitas.IInitializeSystem;

  //[Core]
  export class InputSystem implements IExecuteSystem, IInitializeSystem, ISetPool {
    _pool:Pool;
    _mouseDown:boolean=false;

    public setPool(pool:Pool) {
      this._pool = pool;
    }

    public initialize() {//
      document.addEventListener('touchstart', this.onTouchStart, true);
      document.addEventListener('touchend', this.onTouchEnd, true);

      document.addEventListener('mousedown', this.onTouchStart, true);
      document.addEventListener('mouseup', this.onTouchEnd, true);
    }

    public execute() {
      //console.log('InputSystem::execute', this._mouseDown);
      this._pool.isAccelerating = this._mouseDown;
    }

    private onTouchStart = (event) => {
      console.log('onTouchStart');
      this._mouseDown = true;
      return true;
    };

    private onTouchEnd = (event) => {
      console.log('onTouchEnd');
      this._mouseDown = false;
    };

  }
}


