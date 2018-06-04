<?php
/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-03-06
 * Time: 18:52
 */

namespace resource\action;

use library\PigOrm\Record;
use resource\model\PermissionManager;
use resource\orm\templates\Admin as AdminTemplate;

abstract class Admin extends Base
{
    /**
     * Admin record
     *
     * @var Record
     */
    protected $admin;

    public function permissionBase()
    {
        $this->admin = PermissionManager::authorization();

        if (empty($this->admin) || $this->admin->empty()) {
            $this->forward('/authorization');
        }
    }

    public function init()
    {
        parent::init();

        $this->view->setTemplate('admin');
    }

    public function render() {
        $this->view->admin = $this->admin;

        parent::render();
    }
}