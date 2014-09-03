<?php

class Vimeo_Api {
    const ENDPOINT_USER       = '/info.json';
    const ENDPOINT_PROJECTS   = '/videos.json';
    const TIMEOUT_DEFAULT_SEC = 30;

    protected $_api_root      = 'http://vimeo.com/api/v2';

    public function getUserProfile( $username) {
        $endpoint = $this->_api_root . '/' . $username . self::ENDPOINT_USER;

        return $this->_executeRequest( $endpoint );
    }

    public function getUserProjects( $username) {
        $endpoint = $this->_api_root . '/' . $username . self::ENDPOINT_PROJECTS;

        return $this->_executeRequest( $endpoint );
    }

    protected function _executeRequest($url) {
        $user_agent = "Vimeo API/PHP";

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_HTTPHEADER, array( 'Accept: application/json', 'Content-Type: multipart/form-data', 'Expect:' ));
        curl_setopt($ch, CURLOPT_TIMEOUT, self::TIMEOUT_DEFAULT_SEC);
        curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_HTTPGET, 1);

        $response = curl_exec($ch);
        return $response;

        curl_close($ch);
    }
}