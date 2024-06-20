# node-mdaemon-rest Changelog

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