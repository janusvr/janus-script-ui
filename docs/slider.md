# ```<Slider>```

A linear slider control.  Fires a ```grabstart``` event when the user grabs the slider, a ```change``` event every time the value of the slider changes, and a ```grabend``` event when the user releases the slider.

## Properties
  * ```width``` - float, default .25
  * ```length``` - float, default 1
  * ```height``` - float, default .2
  * ```grabbing``` - boolean, default false
  * ```active``` - boolean, default false
  * ```value``` - float, default 1
  * ```min``` - float, default 0
  * ```max``` - float, default 1

## Methods
  * ```slider.setValue(value)``` - sets the value of the slider to the specified value

## Events
  * ```grabstart```
  * ```change```
  * ```grabend```


