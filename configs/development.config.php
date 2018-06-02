<?php

$baseConfig = include('../configs/base.config.php');

return array_merge(
    $baseConfig,
    [
        'enableCreationRoutes' => true,

        'homeURL' => 'http://tournamentsmanager.oo/',
//        'AgencjaUprawnienURL' => 'http://agencjauprawnien.oo/',
//        'AgencjaUprawnienURL/authorization' => 'http://agencjauprawnien.oo/',
//
//        'AgencjaWyborczaWSDL' => 'http://agencjauprawnien.oo/webService/service?wsdl',
//        'KomisjaWyborczaWSDL' => 'http://komisjawyborcza.oo/webService/service?wsdl',
//
//        'publicKeyPath' => '../configs/public.pem',
//        'privateKeyPath' => '../configs/private.pem',

        'db' => [
            'KomisjaWyborcza' => [
                'driver' => 'Mysqli',
                'dbname' => 'KomisjaWyborcza',
                'username' => 'root',
                'password' => 'rootroot'
            ]
        ],
        'smarty' => [
            //debugging = true;
            'caching' => true,
            'cache_lifetime' => 0,
            'cache_dir' => '../cache/Smarty/cache',
            'compile_dir' => '../cache/Smarty/templates_c',
        ]
    ]
);