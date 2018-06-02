<?php

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/env.php';

use library\PigFramework\App;
use library\PigFramework\model\router\RouterStandard;

// Define path to application directory
defined('APPLICATION_PATH') || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/..'));

// Define application environment
defined('APPLICATION_ENV') || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'production'));

// Ensure library/ is on include_path
set_include_path(implode(PATH_SEPARATOR, array(
    realpath(APPLICATION_PATH . '/library'),
    get_include_path(),
)));

$router = new RouterStandard();
$pigFramework = new App($router);
$pigFramework->run();