'use strict';
define(
    [
        '/scripts/lib/PigOrmJS/DataTemplate.js',
        '/scripts/app/js/vue/component/general/loader.js',
        '/scripts/app/js/vue/component/general/contextMenu.js',
    ],
    function (DateTemplate, loaderObj, contextMenuObj) {

        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = `
            th.header-order {
                cursor: pointer;
            }
            th.header-order:hover
            {
                background-color:rgb(121,215,121);
            }
        `;

        document.body.appendChild(css);

        let tournamentTemplate = new DateTemplate('templates\\Tournament');

        function getTournaments($this) {
            $this.loader = true;
            return tournamentTemplate
                .find($this.currentWhere, $this.currentSort, null, $this.pageSize, ($this.currentPage - 1) * $this.pageSize)
                .then(function (tournaments) {
                    $this.tournaments = tournaments.collection;
                    $this.loader = false;
                    setGetParams($this);
                });
        }

        function find($this) {
            $this.loader = true;
            for (let item in $this.searchParams) {
                if ($this.searchParams[item].value != "") {

                    let value = $this.searchParams[item].value;
                    if (typeof $this.searchParams[item].pattern !== 'undefined') {
                        value = $this.searchParams[item].pattern.replace("?", value);
                    }

                    $this.currentWhere[$this.searchParams[item].where] = value;
                } else {
                    delete ($this.currentWhere[$this.searchParams[item].where]);
                }
            }

            tournamentTemplate.count("*", $this.currentWhere).then(function (amountRecords) {
                $this.amountRecords = amountRecords;
                getTournaments($this);
            });
        }

        function setGetParams($this) {

            let params = {
                'data': {
                    currentSortCol: $this.currentSortCol,
                    currentSortDir: $this.currentSortDir,
                    currentPage: $this.currentPage,
                    searchParams: {},
                }
            };

            for (let item in $this.searchParams) {
                params.data.searchParams[item] = {};
                params.data.searchParams[item].value = $this.searchParams[item].value;
            }

            let url_string = window.document.URL;
            let url = new URL(url_string);

            url.searchParams.set($this.id, JSON.stringify(params));
            window.history.pushState(null, null, url);
        }

        function loadGetParams($this) {
            let url_string = window.document.URL;
            let url = new URL(url_string);
            let options = JSON.parse(url.searchParams.get($this.id));

            if (options != null) {
                $this.currentSortCol = options.data.currentSortCol;
                $this.currentSortDir = options.data.currentSortDir;
                $this.currentSort = options.data.currentSortCol + " " + options.data.currentSortDir;

                $this.currentPage = options.data.currentPage;

                $this.searchParams.tournamentName.value = options.data.searchParams.tournamentName.value;
                $this.searchParams.tournamentType.value = options.data.searchParams.tournamentType.value;
                $this.searchParams.login.value = options.data.searchParams.login.value;
            }
        }

        return {
            components: {
                'component-general-loader': loaderObj,
                'component-general-contextMenu': contextMenuObj,
            },
            data: function () {
                return {
                    id: 'tournament-component',
                    tournaments: [],
                    amountRecords: 0,
                    currentSort: 'createDate asc',
                    currentSortCol: 'createDate',
                    currentSortDir: 'asc',
                    pageSize: 10,
                    currentPage: 1,
                    currentWhere: {},
                    loader: true,
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
                }
            },
            created:

                function () {

                    let $this = this;

                    $this.$root.$on('refreshRecord', function () {
                        find($this);
                    });

                    loadGetParams($this);
                    find($this);
                }

            ,
            methods: {
                sort: function (s) {
                    let $this = this;

                    if (s === $this.currentSortCol) {
                        $this.currentSortDir = $this.currentSortDir === 'asc' ? 'desc' : 'asc';
                    }
                    $this.currentSortCol = s;

                    $this.currentSort = $this.currentSortCol + " " + $this.currentSortDir;

                    getTournaments($this);
                }
                ,
                nextPage: function () {
                    if ((this.currentPage * this.pageSize) < this.amountRecords) {
                        this.currentPage++;
                        let $this = this;
                        getTournaments($this);
                    }
                }
                ,
                prevPage: function () {
                    if (this.currentPage > 1) {
                        this.currentPage--;
                        let $this = this;
                        getTournaments($this);
                    }
                }
                ,
                setPage: function (numberPage) {
                    this.currentPage = numberPage;
                    let $this = this;
                    getTournaments($this);
                }
                ,
                search: function () {
                    let $this = this;
                    find($this);
                }
                ,
                add: function () {
                    this.$root.$emit('showForm');
                }
                ,
                edit: function () {
                    console.log("edit");
                }
                ,
                remove: function (tournamentId) {
                    let $this = this;
                    tournamentTemplate
                        .createRecord()
                        .then(function (tournament) {

                            tournament.tournamentId = tournamentId;
                            tournament.status = "old";
                            tournament.delete([], ['tournament']);

                            $this.$toast.success({
                                title: 'Success',
                                message: 'Poprawnie usunięto rekord'
                            });

                            $this.$root.$emit('refreshRecord');
                            $this.show = false;
                        });
                }
                ,
                reset: function () {
                    this.searchParams.tournamentName.value = "";
                    this.searchParams.tournamentType.value = "";
                    this.searchParams.login.value = "";
                }
                ,
                openMenu: function (event, tournamentId) {
                    // console.log(ContextMenu);
                    // console.log(event);
                    this.$root.$emit('showMenu', {event: event, tournamentId: tournamentId, $this: this});
                    // console.log(tournamentId);
                }
            },
            computed: {
                amountPages: function () {
                    let amountPage = Math.round(this.amountRecords / this.pageSize - 0.5);

                    if (this.amountRecords % this.pageSize !== 0) {
                        amountPage++;
                    }
                    return amountPage;
                }
            }
            ,
            template: `
                <div id="tournamentTable">
                <component-general-contextMenu></component-general-contextMenu>
                <!--<component-form-tournament></component-form-tournament>-->
                <div class="w3-row-padding">
                  <div class="w3-quarter">
                    <input class="w3-input w3-border" type="text" placeholder="Nazwa" v-model="searchParams.tournamentName.value" @keyup.enter="search">
                  </div>
                  <div class="w3-quarter">
                    <input class="w3-input w3-border" type="text" placeholder="Typ" v-model='searchParams.tournamentType.value' @keyup.enter="search">
                  </div>
                  <div class="w3-quarter">
                    <input class="w3-input w3-border" type="text" placeholder="Autor" v-model='searchParams.login.value' @keyup.enter="search">
                  </div>
                  <div class="w3-quarter w3-center">
                    <div class="w3-third">
                        <button class="w3-button w3-green" @click="search"><i class="fas fa-search"></i>&nbsp;Szukaj</button>
                    </div>
                    <div class="w3-third">
                        <button class="w3-button w3-green" @click="reset"><i class="fas fa-align-justify"></i>&nbsp;Wyczyść</button>
                    </div>
                    <div class="w3-third">
                        <button class="w3-button w3-green" @click="add"><i class="fas fa-plus"></i>&nbsp;Dodaj</button>
                    </div>
                  </div>
                </div>
                <br>
              <table class="w3-hoverable">
                <thead>
                  <tr>
                    <th>Lp.</th>
                    <th @click="sort('tournamentName')" class="header-order">
                        Nazwa  
                        <span v-if="currentSortCol == 'tournamentName'">
                            <span v-if="currentSortDir == 'asc'"> 
                            &darr; 
                            </span>
                            <span v-else>
                            &uarr;
                            </span>
                        </span>  
                    </th>
                    <th @click="sort('tournamentType')" class="header-order">
                    Typ
                     <span v-if="currentSortCol == 'tournamentType'">
                            <span v-if="currentSortDir == 'asc'"> 
                            &darr; 
                            </span>
                            <span v-else>
                            &uarr;
                            </span>
                        </span>  
                    </th>
                    <th @click="sort('login')" class="header-order">
                    Autor
                    <span v-if="currentSortCol == 'login'">
                        <span v-if="currentSortDir == 'asc'"> 
                        &darr; 
                        </span>
                        <span v-else>
                        &uarr;
                        </span>
                    </span>  
                    </th>
                    <th @click="sort('createDate')" class="header-order">
                    Data utworzenia
                   <span v-if="currentSortCol == 'createDate'">
                        <span v-if="currentSortDir == 'asc'"> 
                        &darr; 
                        </span>
                        <span v-else>
                        &uarr;
                        </span>
                    </span>  
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tournament, index) in tournaments" @contextmenu="openMenu($event, tournament.tournamentId)">
                    <td>{{(currentPage - 1) * pageSize + index + 1}}</td>
                    <td>{{tournament.tournamentName}}</td>
                    <td>{{tournament.tournamentType}}</td>
                    <td>{{tournament.login}}</td>
                    <td>{{tournament.createDate}}</td>
                    <td>
                        <i class="fas fa-edit" style="cursor: pointer;" @click="edit"></i>
                        <i class="fas fa-trash-alt" style="cursor: pointer;" @click="remove(tournament.tournamentId)"></i>
                    </td>
                  </tr>
                  <tr v-if="amountRecords == 0" >
                    <td colspan="5">Brak rekordów</td>
                  </tr>
                </tbody>
              </table>
              <br>
              <span>Liczba rekordów {{amountRecords}}</span>
              <br>
              <br>
              <div class="w3-bar" v-if="amountPages != 0">
                <a class="w3-button" @click="prevPage">&laquo;</a>
                <a class="w3-button" @click="setPage(index)" v-for="index in amountPages" v-bind:class="{ 'w3-green': index == currentPage }">{{index}}</a>
                <a class="w3-button" @click="nextPage">&raquo;</a>
              </div>
                <component-general-loader v-if="loader"></component-general-loader>

                </div>
            `
        }
    }
);