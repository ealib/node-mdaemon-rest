# node-mdaemon-rest Changelog

## v0.0.9 - 2025-07-23

- faster `GET /api/users` via node-mdaemon-api 25.0.3-alpha.40

## v0.0.8 - 2025-03-17

- compatible with MDaemon 25.0.x
- requires Node.js 19+

## v0.0.7 - 2024-11-26

- compatible with MDaemon 24.5.x
- compatible with Node.js 22.x

## v0.0.6 - 2024-09-09

New verbs and routes:

    GET /api/system/cluster

## v0.0.5 - 2024-08-27

Some list APIs support pagination via query params `page` (0+; default
0) and `pageSize` (default 10).

    GET /api/groups?page=0&pageSize=10
    GET /api/lists?page=0&pageSize=10
    GET /api/lists?page=0&pageSize=10
    GET /api/logs?page=0&pageSize=10
    GET /api/users?page=0&pageSize=10

New verbs and routes:

    GET /api/system/info

Services have a common ancestor class.

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
