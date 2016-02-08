<?php

class AuthenticatedMiddleware
{
    public function __invoke($request, $response, $next)
    {
        // check if request is for modifying sensitive data
        if ($request->isPost() || $request->isPut() || $request->isDelete()) {
            // check if request is for api/login: let this one through
            if ($request->getUri()->getPath() === '/api/login') {
                $response = $next($request, $response);
                return $response;
            }
            // check if user is authenticated
            if (isset($_SESSION['user_state']) && !empty($_SESSION['user_state'])) {
                $session = $_SESSION['user_state'];
                if ($session['id'] === 0) {
                    // user is not effectively logged in, block request
                    return $response->withStatus(401);
                }
            }
        }
        // $response->getBody()->write('<br> auth before');
        // everything fine next middleware
        $response = $next($request, $response);
        // $response->getBody()->write('<br> auth after');

        return $response;
    }
}
