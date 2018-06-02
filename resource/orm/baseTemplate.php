<?php
/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-02-25
 * Time: 19:36
 */

namespace resource\orm;

use library\PigFramework\model\Config;
use library\PigFramework\model\Db;
use library\PigFramework\model\Registry;
use library\PigOrm\DataTemplate;
use library\PigOrm\Record;

abstract class baseTemplate extends DataTemplate
{
    protected function getValidators(): array
    {
        $validators = [];

        $validators['otherValidate'][] = function (Record $record) {
            return ['status' => true, 'message' => 'BAD'];
        };

        return $validators;
    }

    protected function getPermission(): array
    {
        $permissions = [];

        $permissions['GET'] = function (){
            return true;
        };

        return $permissions;
    }

    protected function getDb(): \Zend_Db_Adapter_Mysqli
    {
//        $config = Config::getInstance()->getConfig('db');
//        $db = Db::getInstance($config['KomisjaWyborcza'], 'KomisjaWyborcza');
//        return  $db->getDb();
        return  Registry::getInstance()->db;
    }
}