HTMLCanvasElement.prototype.__gc = HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext = function() {
 
  if (arguments.length && arguments[0] === "2d") patch(this);
  return this.__gc.apply(this, arguments);
 
  function patch(canvas) {
    if (canvas.__isPatched) return;
 
    // get original call vectors for properties
    var propWidth = findDescriptor(canvas, "width"),
        propHeight = findDescriptor(canvas, "height");
 
    // override canvas width/height property to send resize event
    Object.defineProperty(canvas, "width", {
      enumerable: true,
      get: function() {return propWidth.get.call(this)},
      set: function(value) {
        propWidth.set.call(this, value);
        sendEvent(this);
      }
    });
 
    Object.defineProperty(canvas, "height", {
      enumerable  : true,
      get: function() {return propHeight.get.call(this)},
      set: function(value) {
        propHeight.set.call(this, value);
        sendEvent(this);
      }
    });
 
    function sendEvent(el) {
      el.dispatchEvent(new Event("resize"));
      if (el.onresize) {
        setTimeout(el.onresize.bind(el), 4, new Event("resize"));
      }
    }
 
    function findDescriptor(obj, prop) {
      return Object.hasOwnProperty.call(obj, prop) ?
        Object.getOwnPropertyDescriptor(obj, prop) :
        findDescriptor(Object.getPrototypeOf(obj), prop);
    }
 
    canvas.__isPatched = true;
  }
};