room.registerElement('pushbutton', {
  width:        .5,
  length:       .5,
  height:       .5,
  clicking:     false,
  active:       false,

  onactivate:   false,
  ondeactivate: false,

  createChildren: function() {
    this.base = room.createObject('Object', {
      id: 'cube',
      collision_id: 'cube',
      col: V(.6,.6,.6),
      scale: V(this.length,this.height / 2,this.width),
      pos: V(0,this.height/4,0)
    }, this);
    this.button = room.createObject('Object', {
      id: 'cube',
      collision_id: 'cube',
      col: this.col,
      scale: V(this.length * .8, this.height / 4, this.width * .8),
    }, this);
    this.sounds = {
      clickin:  this.createObject('Sound', { id: 'pushbutton-click-in', }),
      clickon:  this.createObject('Sound', { id: 'pushbutton-click-on', }),
      clickoff: this.createObject('Sound', { id: 'pushbutton-click-off', }),
    };

    this.button.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('touchend', this.onMouseUp);
    this.button.addEventListener('click', this.onClick);

    this.setButtonPos();
  },
  activate: function() {
    this.active = !this.active;

    if (this.active && this.onactivate) {
      this.executeCallback(this.onactivate);
    } else if (!this.active && this.ondeactivate) {
      this.executeCallback(this.ondeactivate);
    }
  },
  onClick: function(ev) {
    if (this.onclick) {
      this.executeCallback(this.onclick);
    }
  },
  onMouseDown: function(ev) {
    this.button.sync = true;
    this.clicking = true;
    this.activate();

    this.setState('in');

    ev.stopPropagation();
  },
  onMouseUp: function(ev) {
    if (this.clicking) {
      if (this.active) {
        this.setState('on');
      } else {
        this.setState('off');
      }
      this.button.sync = true;
      this.clicking = false;

      ev.stopPropagation();
    }
  },
  setActive: function(active) {
    this.active = active;
    this.setState(active ? 'on' : 'off');
  },
  setButtonPos: function(pos)   {
    if (typeof pos == 'undefined') pos = (this.active ? .6 : 0);
    var percent = Math.min(1, Math.max(0, pos));
    var defaultpos = this.height / 2;
    this.button.pos = V(0, defaultpos - ((this.height / 8) * percent) + (this.height / 16), 0);
  },
  setState: function(state) {
    if (state != this.state) {
      this.state = state;
      if (state == 'in') {
        this.setButtonPos(1);
        this.sounds.clickin.play();
      } else if (state == 'on') {
        this.setButtonPos(.6);
        this.sounds.clickon.play();
      } else if (state == 'off') {
        this.setButtonPos(0);
        this.sounds.clickoff.play();
      }
    }
  }
    
});

