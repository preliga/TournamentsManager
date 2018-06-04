'use strict';
define(
    [
        './Base.js',
        '../component/admin/menu.js'
    ],
    function (Action, menuObj) {

        let $this;

        return class Admin extends Action {

            constructor() {
                super();

                $this = this;
            }

            afterRender() {
                super.afterRender();

                menuObj.el = '#component-admin-menu';
                $this.components.menu = new Vue(menuObj);
            }
        };
    });