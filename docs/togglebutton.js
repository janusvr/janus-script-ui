# ```<ToggleButton>```

A two-state interactive button.  When the user pushes the button, the ```buttondown``` and ```buttonpress`` events are fired.  When the button is released, the ```buttonup``` and ```buttonrelease``` events are fired.

## Properties
  * **width** - float, default 0.5
  * **length** - float, default 0.5
  * **height** - float, default 0.5
  * **clicking** - boolean, default false
  * **active** - boolean, default false

## Methods
  * ```button.press()``` - simulate a press of the button
  * ```button.release()``` - simulate a release of the button
  * ```button.toggle()``` - toggles the state of the button

## Events
  * buttondown
  * buttonpress
  * buttonup
  * buttonrelease

