Introduction:
Organizer App is your personal task organizer.

## Organizer (CRUD)

## Start Application

```bash
# Install server dependencies
npm install

# Run Unit Tests
npm run test

# Run Express Server  in develop environment - wait for few seconds to launch server 
npm run start
# open http://localhost:3000

##### API Routes
* Register (POST) - http://localhost:3000/auth/register
* Login (POST) - http://localhost:3000/auth/authenticate
* Update User (PUT) - http://localhost:3000/auth/users
* Delete User (DELETE) - http://localhost:3000/auth/users
* Todo List (GET) - http://localhost:3000/api/v1/task
* Add Todo (POST) - http://localhost:3000/api/v1/task/create
* View Todo (GET) - http://localhost:3000/api/v1/task/5d85e7f941caf60ccc4b8c9c
* Update Todo (PUT) - http://localhost:3000/api/task/update/5d85e7f941caf60ccc4b8c9c
* Delete Todo (DELETE) - http://localhost:3000/api/task/destroy/5d85e7f941caf60ccc4b8c9c

#### Version
1.0.0

### License
This project is licensed under the ISC License

```
# this porject is configurable based on environments where each environment has its own .env files setup in config folder
