<?php

/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-02-25
 * Time: 22:13
 */
namespace resource\orm\templates;

use resource\orm\baseTemplate;

class Candidate extends baseTemplate
{
    protected function createSelect(array $variable = []): \Zend_Db_Select
    {
        $select = $this->db->select()
            ->from(['c' => 'candidate'], []);

        return $select;
    }

    protected function createTreeDependency(): array
    {
        // kolumny łączone joinem muszą mieć takie same nazwy wtedy są scalane i updatowane automatycznie
        return
        [
            'keys' => [
                'c.id', // z aliasem !!!
            ],
            'tables' => [
                'candidate' => [
                    'alias' => 'c',
                    'keys' => [
                        'id',
                    ],
                    'columns' => [
                        'id',
                        'name',
                        'secondName',
                        'lastName',
                        'electionCommittee',
                        'photo'
                    ],
                    'defaultValues' => [
                    ]
                ]
            ]
        ];
    }
}