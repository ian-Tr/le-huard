<?php

class ActivityMiddleware {
    public function __invoke($request, $response, $next) {
        // set last activity time
        $_SESSION['LAST_ACTIVITY'] = time();
        $reponse = $next($request, $response);

        return $response;
    }
}
?>
