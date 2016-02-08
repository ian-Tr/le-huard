<?php

class SessionMiddleware
{
    public function __invoke($request, $response, $next)
    {
        // check if request is for modifying sensitive data
        if ($request->isPost() || $request->isPut() || $request->isDelete()) {
            // check if request is post api/login: let this one through
            if ($request->getUri()->getPath() === '/api/login') {
                $response = $next($request, $response);
                return $response;
            }
            // check if session timedout
            if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 450)) {
                // last request was more than 30 minutes ago
                session_unset();     // unset $_SESSION variable for the run-time
                session_destroy();   // destroy session data in storage
                // put defaults in session
                $session = [
                    'id' => '0',
                    'user' => [
                        'userId' => '0',
                        'userName' => '',
                        'userRole' => 'viewer',
                    ],
                ];
                $_SESSION['user_state'] = $session;

                return $response->withStatus(419, 'Session timed out.');
            }
        }
        // $response->getBody()->write('<br> session before');
        $response = $next($request, $response);
        // $response->getBody()->write('<br> session after');
        return $response;
    }
}
?>
