<?php
/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-06-02
 * Time: 18:09
 */

namespace resource\model;

use resource\orm\templates\Admin as AdminTemplate;

class PermissionManager
{
    public static function authorization()
    {
        $admin = AdminTemplate::getInstance()->getAdminBySession();
        if (empty($admin) || $admin->empty()) {
            return null;
        }

        return $admin;
    }
}