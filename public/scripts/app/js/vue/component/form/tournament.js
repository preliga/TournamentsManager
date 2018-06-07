'use strict';
define(
    [
        'text!./tournament.html',
        'text!./tournament.css',
        '/scripts/lib/PigOrmJS/DataTemplate.js',
    ],
    function (html, css, DataTemplate) {


        return function (id) {
            let style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = css;

            document.body.appendChild(style);

            let tournamentTypeTemplate = new DataTemplate('templates\\TournamentType');
            let tournamentTemplate = new DataTemplate('templates\\Tournament');

            return {
                data: function () {
                    return {
                        id: id,
                        tournament: {
                            tournamentName: {
                                value: "",
                                error: false
                            },
                            typeId: {
                                value: "",
                                error: false
                            },
                        },
                        types: {},
                        show: false
                    }
                },
                created: function () {

                    let $this = this;

                    $this.$root.$on('add-'+this.id, function(){
                        $this.show = true;
                    });

                    tournamentTypeTemplate
                        .find()
                        .then(function (types) {
                            $this.types = types.collection;
                        });
                },
                methods: {
                    add: function () {
                        let $this = this;

                        $this.tournament.tournamentName.error = $this.tournament.tournamentName.value === "";
                        $this.tournament.typeId.error = $this.tournament.typeId.value === "";

                        if (!$this.tournament.tournamentName.error && !$this.tournament.typeId.error) {

                            tournamentTemplate
                                .createRecord()
                                .then(function(tournament){

                                    tournament.tournamentName = $this.tournament.tournamentName.value;
                                    tournament.typeId = $this.tournament.typeId.value;

                                    tournament.save([], ['tournament']);

                                    $this.$toast.success({
                                        title:'Success',
                                        message:'Dodano nowy turniej'
                                    });

                                    $this.tournament.tournamentName.value = "";
                                    $this.tournament.tournamentName.error = false;

                                    $this.tournament.typeId.value = "";
                                    $this.tournament.typeId.error = false;

                                    $this.$root.$emit('refresh-'+$this.id);
                                    $this.show = false;
                                });
                        }
                    },
                    hide: function() {
                        this.show = false;
                        this.tournament.tournamentName.error = false;
                        this.tournament.typeId.error = false;
                    }
                },
                // computed: {
                //     t: function () {
                //         console.log("QWEQWEQWE");
                //         let $this = this;
                //         tournamentTypeTemplate
                //             .find()
                //             .then(function (types) {
                //                 console.log(types);
                //
                //                 $this.types = types
                //             });
                //
                //         return t;
                //     }
                // },
                template: html
            }
        }
    });