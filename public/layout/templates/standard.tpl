<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Komisja Wyborcza</title>

    {$scriptLoader->includeAllCSS()}

    {if file_exists("$file.css")}
        <link rel="stylesheet" href="/{$file}.css">
    {/if}

    {$scriptLoader->includeAllJS()}
</head>

<body>
<a href="/">
    <img src="/images/header.png" width="100%">
</a>
<br>

<div class="page">
    <div class="container">
        <div class="statements">
            {if !empty($statement['error'])}
                {foreach $statement['error'] as $message}
                    <div class="statements-error alert alert-danger" role="alert">
                        {$message}
                    </div>
                {/foreach}
            {/if}

            {if !empty($statement['success'])}
                {foreach $statement['success'] as $message}
                    <div class="statements-success alert alert-success" role="alert">
                        {$message}
                    </div>
                {/foreach}
            {/if}

        </div>
        <div class="bg-faded p-4 my-4">
            {if file_exists("$file.tpl")}
                {include file="{$file}.tpl"}
            {/if}
        </div>
    </div>
</div>

<footer class="bg-faded text-center py-1" style="position:fixed; bottom:0; width: 100%;">
    <div class="container">
        <a href="/admin/login"> Admin panel</a>
    </div>
</footer>
<!-- App -->
<script data-main="/scripts/app/js/app" src="/scripts/lib/require.js"></script>

</body>

</html>









