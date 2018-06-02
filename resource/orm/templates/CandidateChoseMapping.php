<?php
/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-02-25
 * Time: 18:30
 */

namespace resource\orm\templates;

use resource\orm\baseTemplate;

class CandidateChoseMapping extends baseTemplate
{
    protected function createSelect(array $variable = []): \Zend_Db_Select
    {
        $select = $this->db->select()
            ->from(['ccm' => 'candidate_chose_mapping'], []);

        return $select;
    }

    protected function createTreeDependency(): array
    {
        // kolumny łączone joinem muszą mieć takie same nazwy wtedy są scalane i updatowane automatycznie
        return
            [
                'keys' => [
                    'tokenMapping' => 'ccm.tokenMapping', // z aliasem !!!
                ],
                'tables' => [
                    'candidate_chose_mapping' => [
                        'alias' => 'ccm',
                        'keys' => [   /// ustalić tylko jeden klucz
                            'tokenMapping',
                        ],
                        'columns' => [
                            'tokenMapping',
                            'candidateId',
                            'createDate',
                        ],
                        'defaultValues' => [
                            'tokenMapping' => sha1(date('Y-m-d H:i:s')),
                            'createDate' => date('Y-m-d H:i:s')
                        ]
                    ]
                ]
            ];
    }
}