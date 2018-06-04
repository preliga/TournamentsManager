<?php

namespace content;

use resource\action\Base;

class index extends Base
{
    public function onAction()
    {
        $this->redirect('authorization');
    }
}
