'use strict';
define(
    [
        'text!./loader.html',
        'text!./loader.css'
    ],
    function (html, css) {

        return function (id) {
            let style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = css;

            document.body.appendChild(style);

            return {
                data: function () {
                    return {
                        id: id
                    }
                },
                created: function () {
                },
                template: html
            }
        }
    });