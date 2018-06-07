'use strict';
define(
    [
        '/scripts/app/js/vue/component/general/loader.js',
        '/scripts/app/js/vue/component/general/contextMenu.js',
    ],
    function (loaderObj, contextMenuObj) {
        /*
         Events:
            -add
            -remove
            -edit
            -contextMenu
            -refresh
         */

        return function (id) {

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

            function find($this) {
                // $this.loader = true;
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

                $this.dataTemplate.count("*", $this.currentWhere).then(function (amountRecords) {
                    $this.amountRecords = amountRecords;
                    getItems($this);
                });
            }

            function getItems($this) {
                // $this.loader = true;
                return $this.dataTemplate
                    .find($this.currentWhere, $this.currentSort, null, $this.pageSize, ($this.currentPage - 1) * $this.pageSize)
                    .then(function (items) {
                        $this.items = items.collection;
                        // $this.loader = false;
                        setGetParams($this);
                    });
            }


            let options = {
                add: {
                    label: "<i class='fas fa-plus'></i> Dodaj",
                    function: function ($this) {
                        // console.log($this);
                        $this.$root.$emit('add-' + id);
                    }
                },
                remove: {
                    label: "<i class='fas fa-trash-alt'></i> Usuń",
                    function: function ($this) {
                        // console.log(qew);
                        $this.$root.$emit('remove-' + id);
                    }
                }
            };

            return {
                components: {
                    'component-general-loader': loaderObj(id),
                    'component-general-contextMenu': contextMenuObj(id, options),
                },
                data: function () {
                    return {
                        id: id,
                        dataTemplate: null,
                        baseTable: null,

                        searchParams: null,
                        amountRecords: 0,
                        pageSize: 10,

                        currentSort: '',
                        currentSortCol: '',
                        currentSortDir: '',
                        currentPage: 1,
                        currentWhere: {},

                        items: [],
                        selectedItems: {},

                    }
                },
                created: function () {
                    let $this = this;

                    $this.$root.$on('refresh-' + this.id, function () {
                        find($this);
                    });

                    $this.$root.$on('remove-' + this.id, function (params) {
                        $this.dataTemplate
                            .createRecord()
                            .then(function (item) {
                                $this.dataTemplate
                                    .getKeyAlias()
                                    .then(function (response) {

                                        console.log($this.selectedItems);
                                        
                                        // let id = response.data.results;
                                        // item[id] = params.id;
                                        // item.status = "old";
                                        // item.delete([], [$this.baseTable]);
                                        //
                                        // $this.$toast.success({
                                        //     title: 'Success',
                                        //     message: 'Poprawnie usunięto rekord'
                                        // });
                                        //
                                        // $this.$root.$emit('refresh-'+$this.id);
                                        // $this.show = false;
                                    });

                            });
                    });

                    loadGetParams($this);
                    find($this);
                },
                methods: {
                    selected: function(index) {
                        this.selectedItems[index] = !this.selectedItems[index];
                        // console.log(index);
                        let test = this.items;
                        this.items = {};
                        this.items = test;
                        // console.log(this.selectedItems);
                    },
                    sort: function (sort) {
                        let $this = this;

                        if (sort === $this.currentSortCol) {
                            $this.currentSortDir = $this.currentSortDir === 'asc' ? 'desc' : 'asc';
                        }
                        $this.currentSortCol = sort;

                        $this.currentSort = $this.currentSortCol + " " + $this.currentSortDir;

                        getItems($this);
                    },
                    nextPage: function () {
                        let $this = this;

                        if (($this.currentPage * $this.pageSize) < $this.amountRecords) {
                            $this.currentPage++;
                            getItems($this);
                        }
                    },
                    prevPage: function () {
                        if (this.currentPage > 1) {
                            this.currentPage--;
                            let $this = this;
                            getItems($this);
                        }
                    },
                    setPage: function (numberPage) {
                        this.currentPage = numberPage;
                        let $this = this;
                        getItems($this);
                    },
                    search: function () {
                        let $this = this;
                        find($this);
                    },
                    add: function () {
                        this.$root.$emit('add-' + this.id);
                    },
                    edit: function () {
                        console.log("edit");
                    },
                    remove: function (id) {
                        this.$root.$emit('remove-' + this.id, {id: id});
                    },
                    reset: function () {
                        for (let item in this.searchParams) {
                            this.searchParams[item].value = "";
                        }
                    },
                    openMenu: function (event, tournamentId) {
                        this.$root.$emit('contextmenu-' + this.id, {
                            event: event,
                            tournamentId: tournamentId,
                            $this: this
                        });
                    }
                },
                computed: {
                    amountPages: function () {
                        let amountPage = Math.round(this.amountRecords / this.pageSize - 0.5);

                        if (this.amountRecords % this.pageSize !== 0) {
                            amountPage++;
                        }
                        return amountPage;
                    },
                }
            }
        };
    });