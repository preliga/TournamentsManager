<?php

/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2017-10-29
 * Time: 15:35
 */

namespace content\orm;

use library\PigFramework\model\Config;
use library\PigOrm\action\Action;
use library\PigOrm\model\{
    CollectionManager, DataTemplateManager, RecordManager
};

class orm extends Action
{
    public function onAction()
    {
        $type = $this->getParam('type');

        $ormTemplatesPath = Config::getInstance()->getConfig('ormTemplatesPath');

        $dataTemplate = $this->getParam('dataTemplate');
        $dataTemplate = "{$ormTemplatesPath}{$dataTemplate}";

        $method = $this->getParam('method');

        $manager = null;
        if ($type == "dataTemplate") {
            $manager = new DataTemplateManager($dataTemplate::getInstance());
        } else if ($type == "record") {
            $manager = new RecordManager($dataTemplate::getInstance());

        } else if ($type == "collection") {
            $manager = new CollectionManager($dataTemplate::getInstance());
        } else {
            $this->view->status = false;
            $this->view->message = "Bad type manager.";
        }

        if (!empty($manager)) {
            $this->view->results = $manager->$method($this->getParams());
        }
    }
}