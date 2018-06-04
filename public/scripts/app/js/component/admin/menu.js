'use strict';
define(
    [
    ],
    function () {
        return {
            data: {
            },
            template: `
                <nav class="w3-sidebar w3-bar-block w3-collapse w3-animate-left w3-card" style="z-index:3;width:320px;" id="mySidebar">
                    <a href="/admin/tournaments" class="w3-bar-item w3-button w3-border-bottom w3-large"> Tournament Manager </a>
                    <a href="/admin/tournaments" class="w3-bar-item w3-button"><i class="fa fa-trophy w3-margin-right"></i>Turnieje</a>
                    <a href="/admin/logout" class="w3-bar-item w3-button"><i class="fa fa-sign-out-alt w3-margin-right"></i>Wyloguj</a>
                </nav>
            `
        }
    });