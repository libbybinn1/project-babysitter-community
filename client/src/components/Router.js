
import { Routes, Route } from 'react-router-dom'
import Main from './Main';
import Error from "./Error/Error";
import LogIn from "./Log/LogIn";
import SignIn from './Log/SignIn'
import GetRequest from '../components/user/GetRequest';
import MyCommitments from '../components/user/myCommitments';
import AddReqest from '../components/user/AddReqest';
import GetMyReqests from '../components/user/GetMyReqests';
import ExceptionRequest from '../components/user/ExceptionRequest';
import SignInReqests from '../components/manager/SignInReqests';
import ExceptionRequests from '../components/manager/ExceptionRequests';
import ManagerNavBar from '../components/manager/managerNavBar'
import Email from './manager/Email';
import Members from './manager/Members';
import MyHistory from './user/myHistory';
import Chat from './user/Chat';
import Logout from './Log/logOut';



export default function Router() {

 
    return (
        <div className="App">
            <Routes>
                <Route exact="true" element={<LogIn />} path="/" />
                <Route exact="true" element={<LogIn />} path="/logIn" />
                <Route exact="true" element={<SignIn />} path="/signIn" />
                <Route exact="true" element={<Error />} path="/main/*" />
                <Route exact="true" element={<Main />} path="/main" />
                <Route exact="true" element={<GetRequest />} path="main/babysitter/reqests" />
                <Route exact="true" element={<MyCommitments />} path="main/babysitter/myCommitment" />
                <Route exact="true" element={<GetMyReqests />} path="main/babysitter/myReqests" />
                <Route exact="true" element={<AddReqest />} path="main/babysitter/addReqest" />
                <Route exact="true" element={<ExceptionRequest />} path="main/babysitter/exceptionRequest" />
                <Route exact="true" element={<MyHistory />} path="main/babysitter/history" />
                <Route exact="true" element={<Chat />} path="/main/babysitter/chat" />
                <Route exact="true" element={<Logout />} path="/main/logOut" />
                <Route exact="true" element={<ManagerNavBar />} path="main/managerNavBar" />
                <Route exact="true" element={<SignInReqests />} path="main/manager/signInReqests" />
                <Route exact="true" element={<ExceptionRequests />} path="main/manager/exceptionRequests" />
                <Route exact="true" element={<Email />} path="main/manager/sendEmail" />
                <Route exact="true" element={<Members />} path="main/manager/members" />
                <Route exact="true" element={<Error />} path="*" />
            </Routes>
        </div>
    );
}

