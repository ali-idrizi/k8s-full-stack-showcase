# Web-Client Microservice

This microservice is a Next.js app that serves the web front-end and allows users to login/register and manage their todos.

## Built With

- **chakra-ui**: used to build the UI and light/dark modes
- **react-query**: used for fetching and updating data and state management
- **formik**: used to build the forms
- **yup**: used to validate form data
- **framer-motion**: used for animations when switching lists and adding/deleting todo items
- **axios**: used to send HTTP requests

## Structure

- **`api`**: uses axios for HTTP requests and exports an `API` class which is used to make requests
- **`components`**
- **`configs`**: stores default configs for axios and react-query
- **`hocs`**: some wrappers around `getServerSideProps`
  - **`withApi`**: creates an `API` instance to be used for sending requests
  - **`withAuth`**: adds the authentication details in react-query, such as `userId` and `isLoggedIn`
  - **`withAuthenticatedRoute`**: redirects to another URL in case the user is not authenticated
  - **`withCookiesProp`**: adds a `cookies` field to the props, currently used by chakra-ui to set the correct theme during server rendering
  - **`withHocs`**: allows combining multiple hocs type-safely. Currently this must be used even when a single hoc is required. Some hocs require others to be called prior to it (e.g. `withAuthenticatedRoute` requires `withAuth` to access the `isLoggedIn` field)
  - **`withReactQuery`**: creates a react-query client instance and dehydrates it at the end, it adds the contents to the `dehydratedState` props
  - **`withUnauthenticatedRoute`**: redirects to another URL in case the user is authenticated
- **`hooks`**: some useful hooks for managing data and making API calls:
  - **`mutations`**: exports react-query mutations, such as `useLoginMutation`, `useCreateListMutation` and many more 
  - **`queries`**: export queries to fetch data from the server, such as `useTodoList`
  - **`use-api`**: returns the `API` instance stored in `ApiContext`
- **`layouts`**
- **`pages`**
- **`theme`**: modifies chakra-ui default theme
- **`utils`**: exports a few reusable utility functions

## Commands

- `npm run lint`: lint the source code
- `npm run test`: run unit tests

## TODO

- **Implement health checks**
- **Refactor how authentication is handled**: JWT should be stored to react-query `auth` property. Requires changes to the `user` microservice first
