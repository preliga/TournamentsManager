<!DOCTYPE html>
<html>
<title>Tournament Manager</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">

{$scriptLoader->includeAllCSS()}

{if file_exists("$file.css")}
    <link rel="stylesheet" href="/{$file}.css">
{/if}

{$scriptLoader->includeAllJS()}

<body>

<div class="bgimg w3-display-container w3-animate-opacity w3-text-white">
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
    <div class="w3-display-middle">


        <div class="w3-animate-top">
            <form action="/authorization" method="post">
                <div class="container">
                    <input type="text" placeholder="Login" name="login" required>
                    <input type="password" placeholder="Password" name="password" required>

                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>
    <div class="w3-display-bottomleft w3-padding-large">
        SophiaW@re
    </div>
</div>

</body>
</html>

<script>
    // $.notify({
    //     message: "Wybory zostały włączone"
    // },{
    //     type: 'success'
    // });
</script>