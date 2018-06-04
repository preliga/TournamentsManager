'use strict';
define(
    [
    ],
    function () {

        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = `
            #floatBarsG{
                position:relative;
                width:228px;
                height:28px;
                margin:auto;
            }
            
            .floatBarsG{
                position:absolute;
                top:0;
                background-color:rgb(217,217,217);
                width:28px;
                height:28px;
                animation-name:bounce_floatBarsG;
                    -o-animation-name:bounce_floatBarsG;
                    -ms-animation-name:bounce_floatBarsG;
                    -webkit-animation-name:bounce_floatBarsG;
                    -moz-animation-name:bounce_floatBarsG;
                animation-duration:1.5s;
                    -o-animation-duration:1.5s;
                    -ms-animation-duration:1.5s;
                    -webkit-animation-duration:1.5s;
                    -moz-animation-duration:1.5s;
                animation-iteration-count:infinite;
                    -o-animation-iteration-count:infinite;
                    -ms-animation-iteration-count:infinite;
                    -webkit-animation-iteration-count:infinite;
                    -moz-animation-iteration-count:infinite;
                animation-direction:normal;
                    -o-animation-direction:normal;
                    -ms-animation-direction:normal;
                    -webkit-animation-direction:normal;
                    -moz-animation-direction:normal;
                transform:scale(.3);
                    -o-transform:scale(.3);
                    -ms-transform:scale(.3);
                    -webkit-transform:scale(.3);
                    -moz-transform:scale(.3);
            }
            
            #floatBarsG_1{
                left:0;
                animation-delay:0.6s;
                    -o-animation-delay:0.6s;
                    -ms-animation-delay:0.6s;
                    -webkit-animation-delay:0.6s;
                    -moz-animation-delay:0.6s;
            }
            
            #floatBarsG_2{
                left:28px;
                animation-delay:0.75s;
                    -o-animation-delay:0.75s;
                    -ms-animation-delay:0.75s;
                    -webkit-animation-delay:0.75s;
                    -moz-animation-delay:0.75s;
            }
            
            #floatBarsG_3{
                left:57px;
                animation-delay:0.9s;
                    -o-animation-delay:0.9s;
                    -ms-animation-delay:0.9s;
                    -webkit-animation-delay:0.9s;
                    -moz-animation-delay:0.9s;
            }
            
            #floatBarsG_4{
                left:85px;
                animation-delay:1.05s;
                    -o-animation-delay:1.05s;
                    -ms-animation-delay:1.05s;
                    -webkit-animation-delay:1.05s;
                    -moz-animation-delay:1.05s;
            }
            
            #floatBarsG_5{
                left:114px;
                animation-delay:1.2s;
                    -o-animation-delay:1.2s;
                    -ms-animation-delay:1.2s;
                    -webkit-animation-delay:1.2s;
                    -moz-animation-delay:1.2s;
            }
            
            #floatBarsG_6{
                left:142px;
                animation-delay:1.35s;
                    -o-animation-delay:1.35s;
                    -ms-animation-delay:1.35s;
                    -webkit-animation-delay:1.35s;
                    -moz-animation-delay:1.35s;
            }
            
            #floatBarsG_7{
                left:171px;
                animation-delay:1.5s;
                    -o-animation-delay:1.5s;
                    -ms-animation-delay:1.5s;
                    -webkit-animation-delay:1.5s;
                    -moz-animation-delay:1.5s;
            }
            
            #floatBarsG_8{
                left:199px;
                animation-delay:1.64s;
                    -o-animation-delay:1.64s;
                    -ms-animation-delay:1.64s;
                    -webkit-animation-delay:1.64s;
                    -moz-animation-delay:1.64s;
            }
            
            
            
            @keyframes bounce_floatBarsG{
                0%{
                    transform:scale(1);
                    background-color:rgb(76,175,80);
                }
            
                100%{
                    transform:scale(.3);
                    background-color:rgb(255,255,255);
                }
            }
            
            @-o-keyframes bounce_floatBarsG{
                0%{
                    -o-transform:scale(1);
                    background-color:rgb(76,175,80);
                }
            
                100%{
                    -o-transform:scale(.3);
                    background-color:rgb(255,255,255);
                }
            }
            
            @-ms-keyframes bounce_floatBarsG{
                0%{
                    -ms-transform:scale(1);
                    background-color:rgb(76,175,80);
                }
            
                100%{
                    -ms-transform:scale(.3);
                    background-color:rgb(255,255,255);
                }
            }
            
            @-webkit-keyframes bounce_floatBarsG{
                0%{
                    -webkit-transform:scale(1);
                    background-color:rgb(76,175,80);
                }
            
                100%{
                    -webkit-transform:scale(.3);
                    background-color:rgb(255,255,255);
                }
            }
            
            @-moz-keyframes bounce_floatBarsG{
                0%{
                    -moz-transform:scale(1);
                    background-color:rgb(76,175,80);
                }
            
                100%{
                    -moz-transform:scale(.3);
                    background-color:rgb(255,255,255);
                }
            }
        `;

        document.body.appendChild(css);

        return {
            data: function() {
                return {}
            },
            created: function () {
            },
            template: `
                <div id="app">
                    <div id="floatBarsG" >
                        <div id="floatBarsG_1" class="floatBarsG"></div>
                        <div id="floatBarsG_2" class="floatBarsG"></div>
                        <div id="floatBarsG_3" class="floatBarsG"></div>
                        <div id="floatBarsG_4" class="floatBarsG"></div>
                        <div id="floatBarsG_5" class="floatBarsG"></div>
                        <div id="floatBarsG_6" class="floatBarsG"></div>
                        <div id="floatBarsG_7" class="floatBarsG"></div>
                        <div id="floatBarsG_8" class="floatBarsG"></div>
                    </div>
                </div>
            `
        }
    });