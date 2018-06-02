<?php
/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-02-25
 * Time: 18:30
 */

namespace resource\orm\templates\vote;

use resource\orm\templates\Vote;

class VoteJoinCandidate extends Vote
{
    protected function createSelect(array $variable = []): \Zend_Db_Select
    {
        $select = parent::createSelect($variable)
            ->joinLeft(['c' => 'candidate'], 'c.id = v.candidateId', []);

        return $select;
    }

    protected function createTreeDependency(): array
    {
        $treeDependency = parent::createTreeDependency();

        $treeDependency['tables']['candidate'] = [
            'alias' => 'c',
            'keys' => [
                'candidateId' => 'id',
            ],
            'columns' => [
                'candidateId' => 'id',
                'name',
                'secondName',
                'lastName',
                'electionCommittee',
                'photo',
            ],
            'defaultValues' => [
            ]
        ];

        return $treeDependency;
    }
}