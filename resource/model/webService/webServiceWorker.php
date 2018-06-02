<?php
/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-04-01
 * Time: 16:59
 */

namespace resource\model\webService;


use resource\orm\templates\CandidateChoseMapping;
use resource\orm\templates\Vote;

class webServiceWorker
{
    public function changeToken($user)
    {
        $candidate = CandidateChoseMapping::getInstance()->findOne(['tokenMapping = ?' => $user->choseToken, 'NOW() < DATE_ADD(createDate, INTERVAL 50 MINUTE)']);

        $obj = new \stdClass();

        if ($candidate->empty()) {
            $obj->status = 'error';
            $obj->message = 'Brak Wyborcy';
            return ['changeTokenResult' => json_encode($obj)];
        }

        $vote = Vote::getInstance()->findOne(['token = ?' => $user->userToken]);

        if ($vote->empty()) {
            $vote = Vote::getInstance()->createRecord();
            $vote->token = $user->userToken;
        }

        $vote->candidateId = $candidate->candidateId;
        $vote->save(['candidate']);

        $candidate->delete(['candidate']);

        $obj->status = 'success';
        $obj->message = 'Oddano głos na kandydata';

        return ['changeTokenResult' => json_encode($obj)];
    }
}