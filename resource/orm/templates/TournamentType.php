<?php
/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-06-02
 * Time: 15:49
 */

namespace resource\orm\templates;

use resource\orm\baseTemplate;

class TournamentType extends baseTemplate
{
    protected function createSelect(array $variable = []): \Zend_Db_Select
    {
        $select = $this->db->select()
            ->from(['tt' => 'tournament_type'], []);

        return $select;
    }

    protected function createTreeDependency(): array
    {
        // kolumny łączone joinem muszą mieć takie same nazwy wtedy są scalane i updatowane automatycznie
        return
            [
                'keys' => [
                    'typeId' => 'tt.id', // z aliasem !!!
                ],
                'tables' => [
                    'tournament_type' => [
                        'alias' => 'tt',
                        'keys' => [   /// ustalić tylko jeden klucz
                            'typeId' => 'id',
                        ],
                        'columns' => [
                            'typeId' => 'id',
                            'tournamentType' => 'name',
                        ],
                        'defaultValues' => [
                        ]
                    ],
                ]
            ];
    }
}
