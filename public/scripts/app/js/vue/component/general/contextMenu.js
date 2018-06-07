'use strict';
define(
    [
        'text!./contextMenu.html',
        'text!./contextMenu.css'
    ],
    function (html, css) {

        return function (id, options = {}) {
            var style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = css;
            document.body.appendChild(style);

            document.oncontextmenu = function (e) {
                var evt = new Object({keyCode: 93});
                stopEvent(e);
            };

            function stopEvent(event) {
                if (event.preventDefault != undefined)
                    event.preventDefault();
                if (event.stopPropagation != undefined)
                    event.stopPropagation();
            }

            window.onclick = hideContextMenu;
            window.onkeydown = listenKeys;

            function showContextMenu(event) {
                console.log(event);
                var contextMenu = document.getElementById('contextMenu');
                contextMenu.style.display = 'block';
                contextMenu.style.left = event.pageX + 'px';
                contextMenu.style.top = event.pageY + 'px';
                return false;
            }

            function hideContextMenu() {
                var contextMenu = document.getElementById('contextMenu');
                contextMenu.style.display = 'none';
            }

            function listenKeys(event) {
                var keyCode = event.which || event.keyCode;
                if (keyCode == 27) {
                    hideContextMenu();
                }
            }

            return {
                data: function () {
                    return {
                        id: id,
                        options: options,
                        viewMenu: false,
                        top: '0px',
                        left: '0px'
                    }
                },
                created: function () {
                    let $this = this;

                    $this.$root.$on('contextmenu-' + $this.id, function (params) {
                        showContextMenu(params.event);
                    })
                },
                methods: {
                    action: function (fun) {
                        fun(this);
                    }
                },
                template: html
            }
        }


    });