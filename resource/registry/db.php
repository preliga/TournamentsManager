<?php
/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-03-31
 * Time: 21:14
 */

use library\PigFramework\model\Config;
use library\PigFramework\model\Db;

$config = Config::getInstance()->getConfig('db');
$db = Db::getInstance($config['KomisjaWyborcza'], 'KomisjaWyborcza');
return $db->getDb();