import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TaskList from './tasks/TasksList';
import PostList from './posts/PostsList';
import UserList from './users/UsersList';
import taskSlice from './Store/TaskSlice';
import postSlice from './Store/PostSlice';
import userSlice from './Store/UserSlice';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ResponsiveAppBar from './common/appBar';
const myStore = configureStore({
  reducer: {
    taskSlice,
    postSlice,
    userSlice
  }
})
function App() {
  return (
    <div className="App">
      <Provider store={myStore}>
        <Router>
          <ResponsiveAppBar/>
          <Routes>
              <Route index element={<h1>Home page</h1>} />
              <Route path='/tasks' element={<TaskList />} />
              <Route path='/posts' element={<PostList />} />
              <Route path='/users' element={<UserList />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
