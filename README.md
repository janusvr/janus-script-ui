# janus-script-ui

A collection of programmable Janus scripting objects to help build interactivity into your website.  This collection includes interface tools like buttons, sliders, toggles, and other physically interactible controls.

 * ```<PushButton>```
 * ```<ToggleButton>```
 * ```<Slider>```

## How do I use these?
To use these components in your Janus room, add the following to the ```<Assets>``` section:

```<AssetScript src="janus-script-ui.js" />```
(TODO - we will have CDNed versions of these once we roll this all out officially, but for now grab a copy from the build/ directory and host it along with your room)

Once you've done that, you can use the elements listed above in your room markup, just like you would any other ```<Object>``` or other tag.  See the documentation for each component for details on how to use it.

## Contributing
We're always looking for input on how we can improve these components!  Feel free to file issues if you have any suggestions or see any bugs with the provided controls, and if you'd like to try making your own, we are more than happy to consider any pull requests!
