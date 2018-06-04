<?php
/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-03-06
 * Time: 20:56
 */

namespace content\admin;

use resource\action\Admin;
use resource\orm\templates\Admin as AdminTemplate;

class logout extends Admin
{
    public function onAction()
    {
        AdminTemplate::getInstance()->logout();

        $this->redirect();
    }
}