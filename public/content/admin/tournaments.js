'use strict';
define(
    [
        '/scripts/app/js/action/Admin.js',
        '/scripts/lib/PigOrmJS/DataTemplate.js',
        '/scripts/app/js/component/table/tournaments.js'
    ],
    function (Admin, DateTemplate, tournamentsTableObj) {

        let currentPage = 1;
        let currentWhere = {};
        let pageSize = 2;

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

                tournamentsTableObj.el = '#component-table-tournaments';

                $this.components.tournementsTable = new Vue(tournamentsTableObj);
                // events();
                // generateTable();
            }
        };

        function events() {
            $('.search-button').on('click', function () {
                let token = $("#token").val();

                currentPage = 1;

                currentWhere = {};
                if (token !== "") {
                    currentWhere = {'token like ?': "%" + token + "%"};
                }

                generateTable();
            });

            $("#token").on('keydown', function (event) {
                if (event.keyCode === 13) {
                    $('.search-button').click();
                }
            });


            $(".pagination").on('click', 'li', function () {
                // console.log($(this).attr('page'));
                currentPage = $(this).attr('page');
                generateTable();
            });
        }

        function generateTable() {

            // $(".votesList tbody>tr").remove();
            // $(".pagination li").remove();
            // $(".loader").show();

            let tournamentTemplate = new DateTemplate('templates\\Tournament');

            tournamentTemplate.count("*", currentWhere).then(function (amountRecords) {

                let amountPage = amountRecords / pageSize;

                if (amountRecords % pageSize !== 0) {
                    amountPage++;
                }

                let div = document.getElementById('pagination');

                let a_left = document.createElement('a');
                div.appendChild(a_left);

                a_left.href = "#";
                a_left.classList.add("w3-button");
                a_left.innerHTML = "&laquo;";

                for (let i = 1; i <= amountPage; i++) {
                    let a = document.createElement('a');
                    div.appendChild(a);

                    // console.log(a);
                    a.classList.add("w3-button");
                    a.innerHTML = i;
                }

                let a_right = document.createElement('a');
                div.appendChild(a_right);
                a_right.href = "#";
                a_right.classList.add("w3-button");
                a_right.innerHTML = "&raquo;";

                tournamentTemplate
                    .find(currentWhere, null, null, pageSize, (currentPage - 1) * pageSize)
                    .then(function (tournaments) {

                        // $(".loader").hide();


                        let table = document.getElementById('tournamentsList');

                        if (tournaments.collection.length !== 0) {
                            tournaments.collection.forEach(function (item, index) {
                                let row = table.insertRow(index + 1);

                                var lp = row.insertCell(0);
                                var name = row.insertCell(1);
                                var type = row.insertCell(2);
                                var author = row.insertCell(3);
                                var createDate = row.insertCell(4);

                                lp.innerHTML = (currentPage - 1) * pageSize + index + 1;
                                name.innerHTML = item.tournamentName;
                                type.innerHTML = item.tournamentType;
                                author.innerHTML = item.login;
                                createDate.innerHTML = item.createDate;
                            });
                        } else {
                            let tr = "<tr><td colspan='4'>Brak szukanego tokenu</td></tr>";
                            $('.votesList').append(tr);
                        }
                    });
            });


        }
    }
);