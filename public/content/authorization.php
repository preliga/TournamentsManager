<?php

namespace content;

use resource\action\Base;
use resource\orm\templates\Admin;

class authorization extends Base
{
    public function permissionBase()
    {
        $admin = Admin::getInstance()->getAdminBySession();

        if (!empty($admin) && !$admin->empty()) {
            $this->redirect('/admin/tournaments', []);
        }
    }

    public function onAction()
    {
        $this->view->setTemplate('login');

        if ($this->getPost()) {
            if ($this->hasPost('login') && $this->hasPost('password')) {
                $result = Admin::getInstance()->login($this->getPost('login'), $this->getPost('password'));

                if ($result) {
                    $this->redirect($this->url);
                } else {
                    $this->statement->pushStatement('error', 'Błędny login lub hasło');
                }

            } else {
                $this->statement->pushStatement('error', 'Sesja wygasła');
            }
        }
    }
}
