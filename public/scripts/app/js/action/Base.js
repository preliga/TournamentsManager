'use strict';
define(
    [
        '/scripts/lib/PigFrameworkJS/Action.js',
    ],
    function (Action) {

        return class Base extends Action {

            constructor() {
                super();

                this.components = {};
            }

            afterRender() {
                super.afterRender();
                datePickerInit();

                baseEvents();
            }
        };

        function baseEvents() {
            // $('.home-link').on('click', function(){
            //     window.location = '/';
            // });
            //
            //
            // $(function () {
            //     $("[data-lazy-load-image]").each(function (index, element) {
            //         var img = new Image();
            //         img.src = $(element).data("lazy-load-image");
            //         // if (typeof $(element).data("image-classname" !== "undefined"))
            //         //     img.className = $(element).data("image-classname");
            //         $(element).append(img);
            //     });
            // });
        }

        function datePickerInit() {
            /**
             * Datepicker init
             */
            // $('.datetimepicker').datetimepicker({
            //     format: 'Y-m-d H:i'
            // });
        }
    });