<?php

class ActivityMiddleware {
    public function __invoke($request, $response, $next) {
        $reponse = $next($request, $response);
        // set last activity time
        $_SESSION['LAST_ACTIVITY'] = time();
        
        return $response;
    }
}
?>
