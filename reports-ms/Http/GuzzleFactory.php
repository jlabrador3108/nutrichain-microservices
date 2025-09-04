<?php
namespace AppBundle\Http;


use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Middleware;
use Psr\Log\LoggerInterface;


class GuzzleFactory
{
public function create(array $options = [], LoggerInterface $logger = null)
{
$stack = HandlerStack::create();
// Retry con backoff exponencial
$stack->push(Middleware::retry(function ($retries, $request, $response, $exception) use ($logger) {
if ($retries >= 3) return false;
if ($exception) return true;
if ($response && $response->getStatusCode() >= 500) return true;
return false;
}, function ($retries) { return 1000 * (2 ** $retries); }));


$config = array_merge([
'timeout' => 5.0,
'connect_timeout' => 2.0,
'http_errors' => false,
'handler' => $stack,
], $options);


return new Client($config);
}
}