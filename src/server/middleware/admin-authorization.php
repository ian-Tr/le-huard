<?php

class AdminAuthorizationMiddleware
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
                // perform check on admin only routes [delete-user, new-post, delete-comment]
                $subject = $request->getUri()->getPath();
                $delete_user = '/(^\/(api)\/(user)(\d+)$)/';
                $new_post = '/(^\/(api)\/(post)$)/';
                $delete_comment = '/(^\/(api)\/(comment)(\d+)$)/';
                // check if request is delete user
                if (preg_match($delete_user, $subject) === 1 && $request->isDelete()) {
                    // check if user is authorized
                    if (!$session['user']['userRole'] === 'admin') {
                        // user is not authorized for this request
                        return $response->withStatus(403);
                    }
                }
                if (preg_match($delete_comment, $subject) === 1 && $request->isDelete()) {
                    // check if user is authorized
                    if (!$session['user']['userRole'] === 'admin') {
                        // user is not authorized for this request
                        return $response->withStatus(403);
                    }
                }
                if (preg_match($new_post, $subject) === 1 && $request->isPost()) {
                    // check if user is authorized
                    if (!$session['user']['userRole'] === 'admin') {
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
