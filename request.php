<?php
require_once( './api/Api.php' );

$api  = new Vimeo_Api();

$user = isset($_GET['user']) ? $_GET['user'] : NULL;

$a = json_decode($api->getUserProfile( $user ), true);
$b = json_decode($api->getUserProjects( $user ), true);

$profile = array("profile" => $a);
$videos = array("videos" => $b);

$merged = array();
$merged = array_merge($profile, $videos);

$json = json_encode($merged);

echo $json;