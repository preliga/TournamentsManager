<?php
/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-02-25
 * Time: 18:30
 */

namespace resource\orm\templates;

use resource\orm\baseTemplate;

class Settings extends baseTemplate
{
    protected $settings;

    public function __construct()
    {
        parent::__construct();

        $this->loadSettings();
    }

    protected function loadSettings()
    {
        $settings = $this->find();

        $temp = [];
        foreach ($settings as $setting) {
            $temp[$setting->alias] = $setting;
        }

        $this->settings = $temp;
    }

    public function getSettings($alias = null)
    {
        if (!empty($alias)) {
            return $this->settings[$alias]->value ?? null;
        } else {

            $settings = new \stdClass();
            foreach ($this->settings as $key => $setting) {
                $settings->$key = $setting->value;
            }
            return $settings;
        }
    }

    public function setSettings($alias, $value)
    {
        $this->settings[$alias]->value = $value;
        $this->settings[$alias]->save();
    }

    protected function createSelect(array $variable = []): \Zend_Db_Select
    {
        $select = $this->db->select()
            ->from(['s' => 'settings'], []);

        return $select;
    }

    public function afterCall($method, $params)
    {
        if ($method == 'setSettings') {
            $this->setSettings($params['alias'], $params['value']);
        }
    }

    protected function createTreeDependency(): array
    {
        // kolumny łączone joinem muszą mieć takie same nazwy wtedy są scalane i updatowane automatycznie
        return
            [
                'keys' => [
                    'settingsId' => 's.id', // z aliasem !!!
                ],
                'tables' => [
                    'settings' => [
                        'alias' => 's',
                        'keys' => [   /// ustalić tylko jeden klucz
                            'settingsId' => 'id',
                        ],
                        'columns' => [
                            'settingsId' => 'id',
                            'alias',
                            'value',
                        ],
                        'defaultValues' => [
                        ]
                    ]
                ]
            ];
    }
}