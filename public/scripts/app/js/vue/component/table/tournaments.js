'use strict';
define(
    [
        'text!/scripts/app/js/vue/component/table/tournaments.html',
        'text!/scripts/app/js/vue/component/table/tournaments.css',

        '/scripts/lib/PigOrmJS/DataTemplate.js',
        '/scripts/app/js/vue/component/general/table/base.js',
    ],
    function (html, css, DateTemplate, componentGeneralTableBase) {

        return function (id){
            let style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = css;

            document.body.appendChild(style);

            let component = componentGeneralTableBase(id);
            let data = component.data();

            component.data = function () {
                return Object.assign(data, {
                    baseTable: 'tournament',
                    dataTemplate: new DateTemplate('templates\\Tournament'),
                    currentSort: 'createDate asc',
                    currentSortCol: 'createDate',
                    currentSortDir: 'asc',
                    searchParams: {
                        tournamentName: {
                            value: "",
                            where: "t.name like ?",
                            pattern: "%?%"
                        },
                        tournamentType: {
                            value: "",
                            where: "tt.name like ?",
                            pattern: "%?%"
                        },
                        login: {
                            value: "",
                            where: "a.login = ?",
                            // pattern: "?"
                        },
                    }
                });
            };

            component.template = html;

            return component;
        }
    }
);