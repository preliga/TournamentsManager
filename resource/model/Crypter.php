<?php
/**
 * Created by PhpStorm.
 * User: Piotr
 * Date: 2018-04-01
 * Time: 23:20
 */

namespace resource\model;

class Crypter
{
    public $privateKey;
    public $publicKey;

    public function __construct($publicKey = null, $privateKey = null)
    {
        $this->publicKey = $publicKey;
        $this->privateKey = $privateKey;
    }

    public function encrypt($data)
    {
        if (empty($this->publicKey)) {
            throw new Exception('Public Key is empty');
        }

        if (openssl_public_encrypt($data, $encrypted, $this->publicKey)) {
            $data = base64_encode($encrypted);
        } else {
            throw new Exception('Unable to encrypt data. Perhaps it is bigger than the key size?');
        }

        return $data;
    }

    public function decrypt($data)
    {
        if (empty($this->privateKey)) {
            throw new Exception('Private Key is empty');
        }

        if (openssl_private_decrypt(base64_decode($data), $decrypted, $this->privateKey)) {
            $data = $decrypted;
        } else {
            $data = '';
        }

        return $data;
    }
}