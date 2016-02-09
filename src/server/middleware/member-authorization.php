<?php

class MemberAuthorizationMiddleware
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

            // check if session is initialized
            if (isset($_SESSION['user_state']) && !empty($_SESSION['user_state'])) {
                $session = $_SESSION['user_state'];
                // perform check on member only routes [post comment, ]

                // check if request is delete user
                if ($request->getUri()->getPath() === '/api/comment' && $request->isPost()) {
                    // check if user is authorized
                    if ($session['user']['userRole'] === 'viewer') {
                        // user is not authorized for this request
                        return $response->withStatus(403);
                    }
                }
            }
        }
        // everything fine next middleware
        $response = $next($request, $response);

        return $response;
    }
}
