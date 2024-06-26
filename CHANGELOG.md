# node-mdaemon-rest Changelog

## v0.0.5 - untagged

New verbs and routes:

    GET /api/system/info

Services have a common ancestor (currently empty).

## v0.0.4 - 2024-06-25

Document routes for OpenAPI document.

New verbs and routes:

    DELETE /api/logs/:id
    GET /api/lists/:id/members

Fix

    POST /api/auth

## v0.0.3 - 2024-06-21

New verbs and routes:

    GET /api/lists
    GET /api/lists/:id

## v0.0.2 - 2024-06-20

Default port is now 8080/tcp.

New verbs and routes:

    GET /api/groups
    GET /api/groups/:id
    GET /api/groups/:id/members
    GET /api/users
    GET /api/users/:id

## v0.0.1 - 2024-05-19

Initial proof of concept. Available verbs and routes:

    POST /api/auth
    GET /api/logs
    GET /api/logs/:id
