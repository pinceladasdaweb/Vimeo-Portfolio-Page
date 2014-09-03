var Vimeo = (function (window, document, undefined) {
    "use strict";
    var module = {
        config: function (config) {
            this.url    = './request.php?user=' + config.user;
            this.limit  = config.limit || 12;
            this.body   = document.querySelector('body');
            this.loader = document.querySelector('.loading');
        },
        supportsSvg: function() {
            return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
        },
        xhr: function () {
            return new window.XMLHttpRequest();
        },
        getJSON: function (options, callback) {
            var xhttp = module.xhr();
            options.url = options.url || location.href;
            options.data = options.data || null;
            xhttp.open('GET', options.url, true);
            xhttp.send(options.data);
            xhttp.onreadystatechange = function () {
                if (xhttp.status === 200 && xhttp.readyState === 4) {
                    callback(JSON.parse(xhttp.responseText));
                }
            };
        },
        create: function (name, props) {
            var el = document.createElement(name), p;
            for (p in props) {
                if (props.hasOwnProperty(p)) {
                    el[p] = props[p];
                }
            }
            return el;
        },
        loop: function (els, callback) {
            var i = 0, max = els.length;

            while (i < max) {
                callback(els[i], i);
                i += 1;
            }
        },
        userProfile: function (data) {
            var self         = this,
                header       = document.querySelector('#header'),
                displayName  = document.createTextNode(data.profile.display_name),
                avatar       = data.profile.portrait_medium,
                //bio          = document.createTextNode(data.profile.bio),
                localization = document.createTextNode(data.profile.location),
                elements     = document.createDocumentFragment(),
                fieldName, figure, img, h1, ul, li, div, p;

            figure = self.create('figure', { className: 'profile-avatar'});
            img    = self.create('img', { src: avatar });
            h1     = self.create('h1', { className: 'profile-name' });
            ul     = self.create('ul', { className: 'field-list' });
            p      = self.create('p', { className: 'profile-fields' });
            div    = self.create('div', { className: 'profile-location fi-marker' });

            figure.appendChild(img);
            h1.appendChild(displayName);
            //p.appendChild(bio);
            div.appendChild(localization);

            elements.appendChild(figure);
            elements.appendChild(h1);
            //elements.appendChild(p);
            elements.appendChild(div);
            header.appendChild(elements);
        },
        userProjects: function (data) {
            var self  = this,
                count = 0;

            self.loop(data.videos, function (video) {
                if(count < self.limit) {
                    var url          = video.url,
                        cover        = video.thumbnail_medium,
                        videoName    = document.createTextNode(video.title),
                        videoTitle   = video.title,
                        fields       = document.createTextNode(video.tags),
                        portfolio    = document.querySelector('.portfolio-list'),
                        elements     = document.createDocumentFragment(),
                        fieldName, h2, ul, li, liF, a, div, p, figure, img, i, len;

                    ul     = self.create('ul', { className: 'field-list' });
                    li     = self.create('li', { className: 'portfolio-item' });
                    div    = self.create('div', { className: 'portfolio-content' });
                    p      = self.create('p', { className: 'portfolio-fields' });
                    figure = self.create('figure', { className: 'portfolio-cover', title: videoTitle });
                    a      = self.create('a', { href: url });
                    img    = self.create('img', { className: 'portfolio-image', src: cover });
                    h2     = self.create('h2', { className: 'portfolio-title' });

                    a.appendChild(img);
                    figure.appendChild(a);
                    div.appendChild(figure);
                    h2.appendChild(videoName);
                    div.appendChild(h2);
                    p.appendChild(fields);
                    div.appendChild(p);
                    li.appendChild(div);

                    elements.appendChild(li);
                    portfolio.appendChild(elements.cloneNode(true));

                    count++;
                }
            });
        },
        createHeader: function () {
            var self     = this,
                elements = document.createDocumentFragment(),
                header;

            header = self.create('header', { className: 'portfolio-header clearfix', id: 'header' });

            elements.appendChild(header);
            self.body.appendChild(elements);
        },
        createContent: function () {
            var self     = this,
                elements = document.createDocumentFragment(),
                content, portfolio, portfolioList;

            content       = self.create('div', { className: 'content-area clearfix', id: 'content' });
            portfolio     = self.create('div', { className: 'portfolio-area clearfix', id: 'portfolio' });
            portfolioList = self.create('ul', { className: 'portfolio-list clearfix' });

            portfolio.appendChild(portfolioList);
            content.appendChild(portfolio);

            elements.appendChild(content);
            self.body.appendChild(elements);
        },
        createFooter: function () {
            var self        = this,
                elements    = document.createDocumentFragment(),
                poweredText = document.createTextNode('Powered by'),
                be          = document.createTextNode('Vimeo'),
                footer, power, powered, p, a;

            footer  = self.create('footer', { className: 'portfolio-footer clearfix', id: 'footer' });
            power   = self.create('div', { className: 'power-by', id: 'power' });
            powered = self.create('p');
            a       = self.create('a', { className: 'power-logo fi-social-vimeo', href: 'https://vimeo.com/', title: 'Vimeo' });
            p       = self.create('p');;

            a.appendChild(be);
            p.appendChild(a);
            powered.appendChild(poweredText);
            power.appendChild(powered);
            power.appendChild(p);
            footer.appendChild(power);

            elements.appendChild(footer);
            self.body.appendChild(elements);
        },
        loading: function (node) {
            var self = this;

            node.removeChild(self.loader);
        },
        handleError: function () {
            var self     = this,
                elements = document.createDocumentFragment(),
                p        = self.create('p', { className: 'error' }),
                text     = document.createTextNode('An error ocurred, try again later.');

            p.appendChild(text);
            elements.appendChild(p);

            self.body.appendChild(elements);

        },
        attach: function (data) {
            var self = this;

            self.createHeader();
            self.createContent();
            self.createFooter();
            self.userProfile(data);
            self.userProjects(data);
        },
        request: function () {
            var self = this,
                body = self.body,
                status;

            if (!self.supportsSvg()) {
                self.loader.src = './assets/css/img/loading.gif';
            }

            self.getJSON({url: self.url}, function (data) {
                status = data.profile;

                if (status) {
                    self.loading(body);
                    self.attach(data);
                } else {
                    self.loading(body);
                    self.handleError();
                }
            });
        },
        profile: function (config) {
            module.config(config);
            module.request();
        }
    };
    return {
        profile: module.profile
    };
}(window, document));