<?php
/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-03-08
 * Time: 19:48
 */

namespace resource\model\webServiceAU;

use library\PigFramework\model\Config;

class AUConnector
{
    /**
     * @var AUConnector
     */
    protected static $instance;

    public $client;

    protected function __construct()
    {
        $this->client = new \Zend_Soap_Client(Config::getInstance()->getConfig('AgencjaWyborczaWSDL'));
    }

    public static function getInstance(): AUConnector
    {
        if (empty(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function revokingElector($pesel)
    {
        $result = $this->client->revokingElector(['pesel' => $pesel]);
        return json_decode($result->revokingElectorResult);
    }

    public function getValidTokens()
    {
        $result = $this->client->getValidTokens();
        return json_decode($result->getValidTokensResult);
    }
}