'use strict';
define(
    [
        '/scripts/lib/PigOrmJS/DataTemplate.js',
    ],
    function (DataTemplate) {

        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = `
            div.input-error {
                border: 1px solid red;
                color: #7d0a06;
                background-color: #fad4d6; 
                padding: 2px; 
                width: 100%;
            }
        `;

        document.body.appendChild(css);

        let tournamentTypeTemplate = new DataTemplate('templates\\TournamentType');
        let tournamentTemplate = new DataTemplate('templates\\Tournament');

        return {
            data: function () {
                return {
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

                $this.$root.$on('showForm', function(){
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

                                $this.$root.$emit('refreshRecord');
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
            template: `
                <div>
                    <div class="w3-row-padding w3-white" style="padding: 10px;" v-if="show">
                      <div class="w3-third">
                        <input class="w3-input w3-border" type="text" placeholder="Nazwa" v-model="tournament.tournamentName.value" >
                        <div class="input-error" v-if="tournament.tournamentName.error">Pole jest wymagane</div>
                      </div>
                      <div class="w3-third">
                        <select class="w3-select" v-model="tournament.typeId.value">
                           <option value="">
                            Wybierz Typ
                          </option>
                          <option v-for="type in types" v-bind:value="type.typeId">
                            {{ type.tournamentType }}
                          </option>
                        </select>
                        <div class="input-error" v-if="tournament.typeId.error">Pole jest wymagane</div>
                      </div>
                      <div class="w3-third w3-center"> 
                          <div class="w3-half">
                            <button class="w3-button w3-green" @click="add"><i class="fas fa-plus"></i>&nbsp;Dodaj</button>
                          </div>
                          <div class="w3-half">
                            <button class="w3-button w3-green" @click="hide"><i class="fas fa-arrow-down"></i>&nbsp;Ukryj</button>
                          </div>
                      </div>
                    </div>
                    <br>
                </div>
            `
        }
    });