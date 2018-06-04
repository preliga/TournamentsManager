<?php
/**
 * Created by PhpStorm.
 * User: Piotr
 */

namespace resource\action;

use library\PigFramework\action\Action;
use resource\orm\templates\Settings;

abstract class Base extends Action
{
    /**
     *
     */
    public function init()
    {
        parent::init();

        $this->definedJS();
        $this->definedCSS();
    }

    public function preActionStandard()
    {
//        $settings = Settings::getInstance()->getSettings();
//        $this->view->settings = $settings;
    }

    public function postAction()
    {
        $this->view->post = $this->getPost();
    }

    /**
     *
     */
    private function definedJS()
    {
//        $this->addJS('/scripts/lib/jquery/jquery.min.js');
//        $this->addJS('/scripts/lib/datetimepicker/jquery.datetimepicker.full.min.js');
//        $this->addJS('/scripts/lib/popper/popper.min.js');
//        $this->addJS('/scripts/lib/bootstrap/js/bootstrap.min.js');
//        $this->addJS('/scripts/lib/bootstrap/js/bootstrap-notify.min.js');
//        $this->addJS('/scripts/lib/bootstrap/js/bootstrap.min.js');
        $this->addJS('/scripts/lib/vue.js');
    }

    /**
     *
     */
    private function definedCSS()
    {
//        $this->addCSS('/scripts/lib/bootstrap/css/bootstrap.min.css');
//        $this->addCSS('/scripts/app/css/font_Josefin-Slab.css');
        $this->addCSS('/scripts/app/css/font_RobotoDraft.css');
//        $this->addCSS('https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800');
//        $this->addCSS('https://fonts.googleapis.com/css?family=Josefin+Slab:100,300,400,600,700,100italic,300italic,400italic,600italic,700italic');
//        $this->addCSS('/scripts/lib/font-awesome-4.7.0/css/font-awesome.min.css');
//        $this->addCSS('/scripts/lib/font-awesome-5.0.8/css/fontawesome-all.css');
        $this->addCSS('/scripts/lib/font-awesome-5.0.13/css/fontawesome-all.css');
//        $this->addCSS('/scripts/lib/datetimepicker/jquery.datetimepicker.min.css');
        $this->addCSS('/scripts/app/css/style.css');
        $this->addCSS('/scripts/lib/w3/w3.css');
        $this->addCSS('/node_modules/cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css');
//        $this->addCSS('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
    }
}