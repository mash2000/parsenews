<?php

function cUrl($url)
{
  $curl_handle = curl_init();
  curl_setopt($curl_handle, CURLOPT_URL, $url);
  curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 2);
  curl_setopt($curl_handle, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($curl_handle, CURLOPT_ENCODING, "");
  curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl_handle, CURLOPT_USERAGENT, 'Your application name');
  $content = curl_exec($curl_handle);
  curl_close($curl_handle);

  return $content;
}
