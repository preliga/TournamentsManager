'use strict';
define(
    [
        '/scripts/app/js/action/Base.js',
        '/scripts/lib/PigOrmJS/DataTemplate.js',
        '/scripts/app/js/model/ORMConfig.js'
    ],
    function (Base, DateTemplate, ORMConfig) {
        return class index extends Base {

            initAction() {

            }

            afterRender() {
                super.afterRender();
                
                $('.div-box').on('click', function(){
                   window.location = $(this).attr('link')
                });
            }
        };
    }
);