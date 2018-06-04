<!DOCTYPE html>
<html>
<title>Tournament Manager</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

{$scriptLoader->includeAllCSS()}

{if file_exists("$file.css")}
    <link rel="stylesheet" href="/{$file}.css">
{/if}

{$scriptLoader->includeAllJS()}

<body class="bgimg">

<div class="w3-display-topright w3-padding-large w3-xlarge">
    <div class="statements">
        {if !empty($statement['error'])}
            {foreach $statement['error'] as $message}
                <div class="w3-panel w3-pale-red w3-display-container">
                        <span onclick="this.parentElement.style.display='none'"
                              class="w3-button w3-pale-red w3-large w3-display-topright">&times;</span>
                    <h3 class="w3-myfont">Error!</h3>
                    <p class="w3-myfont">{$message}</p>
                </div>
            {/foreach}
        {/if}

        {if !empty($statement['success'])}
            {foreach $statement['success'] as $message}
                <div class="w3-panel w3-pale-green w3-display-container">
                        <span onclick="this.parentElement.style.display='none'"
                              class="w3-button w3-pale-green w3-large w3-display-topright">&times;</span>
                    <h3 class="w3-myfont">Success!</h3>
                    <p class="w3-myfont">{$message}</p>
                </div>
            {/foreach}
        {/if}
    </div>
</div>

<!-- Side Navigation -->
<div id="component-admin-menu"></div>

<!-- Page content -->
<div class="w3-main" style="margin-left:320px;">

    <div id="Borge" class="w3-container person">
        {if file_exists("$file.tpl")}
            {include file="{$file}.tpl"}
        {/if}
    </div>

</div>

<!-- App -->
{*<script data-main="/scripts/app/js/app" src="/scripts/lib/require.js"></script>*}
<script data-main="/scripts/app/js/app" src="/node_modules/requirejs/require.js"></script>


</body>
</html>