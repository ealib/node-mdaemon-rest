# `node-mdaemon-rest`

## Description

[Proof of concept](https://en.wikipedia.org/wiki/Proof_of_concept)
for a [RESTful](https://en.wikipedia.org/wiki/REST) API server for
[MDaemon](https://mdaemon.com/pages/mdaemon-email-server).

## Installation

```dos
REM clone source repository
C:\Users\UserName> git clone https://github.com/ealib/node-mdaemon-rest.git

REM enter local source repository
C:\Users\UserName> cd node-mdaemon-rest

REM install dependencies
C:\Users\UserName\node-mdaemon-rest> yarn install
```

## Running the server

```dos
REM development
C:\Users\UserName\node-mdaemon-rest> yarn run start

REM watch mode
C:\Users\UserName\node-mdaemon-rest> yarn run start:dev

REM production mode
C:\Users\UserName\node-mdaemon-rest> yarn run start:prod
```

## Customisation

### Code

- `src/main.ts` contains
  - global prefix (`/api`);
  - metadata for the OpenAPI 3.0 document;
  - OpenAPI UI route (`/openapi`);
- `src/auth/constants.ts` contains the secret string to sign/verify JWTs
- `src/app.module.ts` contains the full path for static files (SPA etc.)

### .env

To override the default port (8080) you can create an `.env` file with a
line as follows:

```env
PORT=8081
```

## Useful links

- [Swagger UI](https://swagger.io/tools/swagger-ui/) &rarr; `http://localhost:4242/openapi`
- OpenAPI 3.0 [JSON](https://www.json.org/json-en.html) API document &rarr; `http://localhost:4242/openapi-json`
- OpenAPI 3.0 [YAML](https://yaml.org/) API document &rarr; `http://localhost:4242/openapi-yaml`

OpenAPI document can be fed in to the [generator](https://openapi-generator.tech/docs/generators/#client-generators) to create proxy code to easily call the MDaemon APIs from your application.

See also other custom generators:

- [NSwag: The Swagger/OpenAPI toolchain for .NET, ASP.NET Core and TypeScript](https://github.com/RicoSuter/NSwag)
- [ng-openapi-gen: An OpenAPI 3 code generator for Angular](https://github.com/cyclosproject/ng-openapi-gen)

## Stay in touch

- Author - Emanuele Aliberti
- Website - [mtka.eu](https://mtka.eu/software/node-mdaemon-api)
- Matrix - [mdaemon-dev](https://matrix.to/#/#mdaemon-dev:matrix.org)

## Legal disclaimer

MDaemon® is a trademark of [MDaemon Technologies, Ltd.](https://mdaemon.com/pages/about-us)
MDaemon Technologies makes no representations, endorsements, or
warranties regarding Third Party Products or Services. Read more in their
[Legal Notice](https://mdaemon.com/pages/legal-notice).

Node.js is a trademark of [OpenJS Foundation](https://openjsf.org/).

Windows&trade; is a [trademark of Microsoft Corp.](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks)

## License

`node-mdaemon-rest` is [MIT licensed](LICENSE).
