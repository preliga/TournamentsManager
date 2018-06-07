'use strict';
define(
    [
        '/scripts/app/js/vue/component/form/tournament.js',
        '/scripts/app/js/vue/component/table/tournaments.js'
    ],
    function (componentFormTournamentObj, componentTableTournamentsObj) {

        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = `

        `;

        document.body.appendChild(css);

        return {
            components: {
                'component-form-tournament': componentFormTournamentObj('tournament-component'),
                'component-table-tournaments': componentTableTournamentsObj('tournament-component')
            },
            data: function (){
                return {

                }
            },
            created: function () {
            },
            method: function () {
                return {

                }
            },
            template: `
                <div id="view-admin-tournament1">
                    <component-form-tournament></component-form-tournament>
                    <component-table-tournaments></component-table-tournaments>
                </div>
            `
        }
    });