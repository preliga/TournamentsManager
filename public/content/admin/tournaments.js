'use strict';
define(
    [
        '/scripts/app/js/action/Admin.js',
        '/scripts/lib/PigOrmJS/DataTemplate.js',
        '/scripts/app/js/vue/view/admin/tournament.js',
    ],
    function (Admin, DateTemplate, ViewAdminTournamentObj) {

        let $this = null;

        return class action extends Admin {

            constructor() {
                super();

                $this = this;
            }

            initAction() {
            }

            afterRender() {
                super.afterRender();

                ViewAdminTournamentObj.el = "#view-admin-tournament";
                $this.components.ViewAdminTournement = new Vue(ViewAdminTournamentObj);
                // tournamentFormObj.el = "#component-form-tournament";
                // $this.components.tournementsForm = new Vue(tournamentFormObj);
                //
                // tournamentsTableObj.el = '#component-table-tournaments';
                // $this.components.tournementsTable = new Vue(tournamentsTableObj);
            }
        };
    }
);