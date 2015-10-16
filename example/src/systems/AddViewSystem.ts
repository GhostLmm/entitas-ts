module example {

  import Sprite = PIXI.Sprite;
  import Entity = entitas.Entity;
  import Texture = PIXI.Texture;
  import CoreMatcher = entitas.CoreMatcher;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IReactiveSystem = entitas.IReactiveSystem;
  import Constants = example.Constants;

  /**
   * Create PIXI sprite and add to the global Stage
   *
   */
  export class AddViewSystem implements IReactiveSystem {

    public get trigger():TriggerOnEvent {
      return CoreMatcher.Resource.onEntityAdded();
    }

    //window['_viewContainer']
    public execute(entities:Array<Entity>) {
      for (var i = 0, l = entities.length; i < l; i++) {
        var e = entities[i];
        var prefab = Constants.resources[e.resource.name];

        var sprite = new Sprite(Texture.fromFrame(prefab.path));
        if (prefab.scale) {
          sprite.scale.set(prefab.scale.x, prefab.scale.y);
        }
        if (prefab.rotation) {
          sprite.rotation = prefab.rotation.z;
        }
        window['_viewContainer'].addChild(sprite);

        e.addView(sprite);
      }
    }
  }
}
