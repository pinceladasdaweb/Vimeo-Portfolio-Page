# Vimeo Portfolio Page
> Vimeo Portfolio Page developed with Vanilla JS

![](https://raw.github.com/pinceladasdaweb/Vimeo-Portfolio-Page/master/screenshot.png)

## Demo
View demo [here](http://www.pinceladasdaweb.com.br/blog/uploads/vimeo-portfolio/).

## How to use?
Vimeo Portfolio Page is a [Vanilla JS](http://vanilla-js.com/) plugin with no dependancies. Include the [`app.min.js`](assets/js/app.min.js) in the footer of your page and initialise it:

```javascript
(function(window, document, undefined) {
    Vimeo.profile({
        user: 'vimeo-username-here',
        limit: 9     // Number of videos to display, default is 12. Vimeo's API returns a maximum of the last 20 videos.
    });
}(window, document));
```

## Browser support
IE8+ and modern browsers.

## License
Vimeo Portfolio Page is licensed under the MIT License.