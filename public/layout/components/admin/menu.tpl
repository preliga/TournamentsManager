<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item {if $path[2] == 'voting'} active {/if}">
                <a class="nav-link" href="/admin/voting"> Wybory </a>
            </li>
            <li class="nav-item {if $path[2] == 'revokingElector'} active {/if}">
                <a class="nav-link" href="/admin/revokingElector">Unieważnij Wyborcę </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/admin/logout">Wyloguj </a>
            </li>
        </ul>
    </div>
</nav>