# NestJS Boilerplate

The NestJS Boilerplate is a streamlined starting point for Node.js applications using the NestJS framework. It offers pre-configured features, including dependency injection and modular architecture, to expedite development and enable the creation of scalable and maintainable server-side applications.

## NestJS Documentation

[Documentation](https://docs.nestjs.com/)

## Require

- Node v20+ or 20.11.0
- [Yarn](https://www.npmjs.com/package/yarn)

## Run Locally

Clone the project

```bash
git clone https://repo.pegadaian.co.id/engineering/boilerplate/service/nestjs.git
```

Go to the project directory

```bash
cd nestjs-boilerplate
```

Install dependencies

```bash
yarn install
```

Rename .env.example to .env

```bash
cp .env.example .env
```

Start the server

```bash
yarn run start:dev
```

or

```
git clone https://link-to-project &&
cd nestjs-boilerplate &&
yarn install &&
cp .env.example .env &&
yarn run start:dev
```

## Module Command

```
nest g resource module/module_name
```

## Decorator

### Example
```
@Get()
@Public()
@Version('2')
@Roles(role.ADMIN, role.USER)
@ResponseMessage(responseMessage.SUCCESS, 'getting list')
findAll(@Agata() agata: AgataHeaders) {
  return this.exampleService.findAll();
}
```
### Explanation
#### Method
for define request method
```
@Get
@Post
@Patch
@Delete
```

#### Public
for define public endpoint without authentication e.g JWT / Basic Auth
```
@Public
```

#### Versioning
for versioning that override the controller version

e.g controller version is version 1 that makes /v1
```
@Controller({
  version: '1',
  path: 'example',
})
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}
```

this will be override the controller version and make the only this endpoint /v2
```
@Version('2')
```

#### Roles
for define roles that based on RBAC [( Role Based Authentication )](https://docs.nestjs.com/security/authorization#basic-rbac-implementation)
```
@Roles(role.ADMIN, role.USER)
```

#### Response ResponseMessage
for define the response SUCCESS message and the second parameter is optional
```
@ResponseMessage(responseMessage.SUCCESS, 'getting list')
```

####

## Running Tests

To run tests, run the following command

```bash
yarn run test
```
