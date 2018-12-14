import React from 'react';
import { Admin, Resource } from 'react-admin';
import { UserList } from './users.js';
import { GradeEventList } from './grade-events.js';
import { PostList, PostEdit, PostCreate } from './posts.js';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
// import jsonapiClient from "ra-jsonapi-client";
import dataProvider from './dataProvider';
// import jsonServerProvider from 'ra-data-json-server';
// const dataProvider = jsonapiClient('https://ysu852rdea.execute-api.us-east-1.amazonaws.com/dev');


const myDataProvider = dataProvider('http://jsonplaceholder.typicode.com');

const App = () => (
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={myDataProvider}>
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
    <Resource name="users" list={UserList} icon={UserIcon}/>
    <Resource name="grade-events" list={GradeEventList} icon={PostIcon}/>
  </Admin>
);

export default App;
