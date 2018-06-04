
<div class="row text-center">



    {*{if $settings->votingEnable == 1}*}
        {*<div class="col-sm-3"></div>*}
        {*<div class="col-sm-6 div-box" link="/elections">*}
            {*<img src="/images/wybory.jpg" width="50%"/>*}
            {*<br>*}
            {*<span> Głosuj </span>*}
        {*</div>*}
        {*<div class="col-sm-3"></div>*}
    {*{elseif $settings->publicResult == 1}*}
        {*<div class="col-sm-6 div-box" link="/results">*}
            {*<img src="/images/wyniki.jpg" width="50%"/>*}
            {*<br>*}
            {*<span> Wyniki </span>*}
        {*</div>*}
        {*<div class="col-sm-6 div-box" link="/voteList">*}
            {*<img src="/images/lista.jpg" width="50%"/>*}
            {*<br>*}
            {*<span> Lista głosów </span>*}
        {*</div>*}
    {*{else}*}
        {*<div class="col-sm-3"></div>*}
        {*<div class="col-sm-6" link="#">*}
            {*<br>*}
            {*<span> Proszę czekać na opublikowanie wyników </span>*}
        {*</div>*}
        {*<div class="col-sm-3"></div>*}
    {*{/if}*}
</div>