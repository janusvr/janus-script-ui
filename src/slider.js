room.registerElement('slider', {
  grabbing: false,
  value: 1,
  min: 0,
  max: 1,
  length: 1,
  width: .25,
  height: .2,

  ongrabstart: false,
  onchange:    false,
  ongrabend:   false,

  createChildren: function() {
    this.base = room.createObject('Object', {
      id: 'cube',
      collision_id: 'cube',
      col: V(.6,.6,.6),
      scale: V(this.length,this.height/2,this.width),
      pos: V(0,this.height/4,0)
    }, this);
    this.track = room.createObject('Object', {
      id: 'cube',
      collision_id: 'cube',
      col: V(.02,.02,.02),
      scale: V(this.length * .9, this.height / 4, this.width / 5),
      pos: V(0, this.base.pos.y + this.height / 4,0)
    }, this);
    this.handle = room.createObject('Object', {
      id: 'cube',
      collision_id: 'cube',
      col: this.col,
      scale: V(this.width / 4, this.height / 4, this.width * .75),
      pos: V(0,this.base.pos.y,0)
    }, this);
    this.sounds = {
      clickin:  room.createObject('Sound', { id: 'pushbutton-click-in', }, this),
      clickon:  room.createObject('Sound', { id: 'pushbutton-click-on', }, this),
      clickoff: room.createObject('Sound', { id: 'pushbutton-click-off', }, this),
    };

    this.handle.addEventListener('mousedown', this.onMouseDown);
    this.track.addEventListener('mousedown', this.onMouseDown);
    // FIXME - bind these in mousedown, for maximum efficiency
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('touchend', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onMouseMove);
    this.handle.addEventListener('click', this.onClick);

    this.setValue(this.value);
  },
  setValue: function(value, skipchange) {
    var realvalue = Math.min(this.max, Math.max(this.min, value));
    var percent = realvalue / (this.max - this.min);
    var pos = (percent - .5) * this.length * .9;
    this.handle.pos = V(pos, this.base.pos.y + this.height * 3 / 8 , 0);
    this.handle.sync = true;
    this.value = realvalue;

    if (this.onchange && !skipchange) {
      this.executeCallback(this.onchange);
    }
  },
  updateValueFromCursorPos: function() {
    // FIXME - vector proxies are currently broken
    var sliderpos = this.parent.localToWorld(this.pos._target.clone());
    var dist = player.head_pos.distanceTo(sliderpos);

    // Cast a ray from my head to the cursor position
    var dir = V(player.cursor_pos.x - player.head_pos.x, player.cursor_pos.y - player.head_pos.y, player.cursor_pos.z - player.head_pos.z);

    // Then project the ray into the same plane as the slider I'm manipulating
    var pos = translate(player.head_pos, scalarMultiply(normalized(dir), dist));
    this.worldToLocal(pos);

    // The slider position is now determined based on the x position (left/right) in the slider's own coordinate system, and the length of the slider
    var foo = pos.x / (this.length * .9) + .5;

    this.setValue(foo * (this.max - this.min));
  },
  onMouseDown: function(ev) {
    this.grabbing = true;
    this.updateValueFromCursorPos(); 
    this.sounds.clickin.play();
    if (this.ongrabstart) this.executeCallback(this.ongrabstart);
    ev.preventDefault();
    ev.stopPropagation();
  },
  onMouseMove: function(ev) {
    if (this.grabbing) {
      this.updateValueFromCursorPos(); 
      ev.stopPropagation();
    }
  },
  onMouseUp: function(ev) {
    if (this.grabbing) {
      this.grabbing = false;
      this.sounds.clickoff.play();
      if (this.ongrabend) this.executeCallback(this.ongrabend);
      ev.stopPropagation();
    }
  },
  onClick: function(ev) {
  }
  
});

