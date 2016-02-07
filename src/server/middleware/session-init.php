<?php

class SessionInitMiddleware
{
    public function __invoke($request, $response, $next)
    {
        // put defaults in session on first time visit
        if (!isset($_SESSION['user_state']) && empty($_SESSION['user_state'])) {
            $session = [
                'id' => '0',
                'user' => [
                    'userId' => '0',
                    'userName' => '',
                    'userRole' => 'viewer',
                ],
            ];
            $_SESSION['user_state'] = $session;
        }
        $response = $next($request, $response);

        return $response;
    }
}
?>
