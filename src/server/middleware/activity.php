<?php

class ActivityMiddleware {
    public function __invoke($request, $response, $next) {
        // $response->getBody()->write('<br> activity before');
        $reponse = $next($request, $response);
        // set last activity time
        $_SESSION['LAST_ACTIVITY'] = time();
        // $response->getBody()->write('<br> activity after '.$response->getStatusCode());

        return $response;
    }
}
?>
