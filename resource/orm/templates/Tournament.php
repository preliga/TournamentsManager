<?php
/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-06-02
 * Time: 15:49
 */

namespace resource\orm\templates;


use library\PigFramework\model\Registry;
use resource\orm\baseTemplate;

class Tournament extends baseTemplate
{
    protected function createSelect(array $variable = []): \Zend_Db_Select
    {
        $select = $this->db->select()
            ->from(['t' => 'tournament'], [])
            ->join(['tt' => 'tournament_type'], 't.typeId = tt.id', [])
            ->join(['a' => 'admin'], 't.authorId = a.id', []);

        $admin = Admin::getInstance()->getAdminBySession();

        if (empty($admin)) {
            throw new \Exception("Autorization Error");
        }

        $select->where('t.authorId = ?', $admin->adminId);

        return $select;
    }

    protected function createTreeDependency(): array
    {
        // kolumny łączone joinem muszą mieć takie same nazwy wtedy są scalane i updatowane automatycznie
        return
            [
                'keys' => [
                    'tournamentId' => 't.id', // z aliasem !!!
                ],
                'tables' => [
                    'tournament' => [
                        'alias' => 't',
                        'keys' => [   /// ustalić tylko jeden klucz
                            'tournamentId' => 'id',
                        ],
                        'columns' => [
                            'tournamentId' => 'id',
                            'authorId',
                            'typeId',
                            'tournamentName' => 'name',
                            'createDate'
                        ],
                        'defaultValues' => [
                            'createDate' => date("Y-m-d H:i:s"),
                            'authorId' => Admin::getInstance()->getAdminBySession()->adminId,
                        ]
                    ],
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
                    'admin' => [
                        'alias' => 'a',
                        'keys' => [   /// ustalić tylko jeden klucz
                            'authorId' => 'id',
                        ],
                        'columns' => [
                            'authorId' => 'id',
                            'login',
//                            'password',
                            'sessionId',
                            'sessionCreate',
                        ],
                        'defaultValues' => [
                        ]
                    ]
                ]
            ];
    }
}
