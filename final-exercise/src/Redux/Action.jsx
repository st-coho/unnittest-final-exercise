import { DELETE_USER, FAIL_REQUEST, GET_USER_LIST, GET_USER_OBJ, MAKE_REQUEST } from "./ActionType";
import axios from 'axios';
import { toast } from 'react-toastify';
import UpdateUser from "../components/DetailUser";

export const makeRequest = () => {
  return {
    type: MAKE_REQUEST,
  };
};

export const failRequest = (err) => {
  return {
    type: FAIL_REQUEST,
    payload: err,
  };
};

export const getUserList = (data) => {
  return {
    type: GET_USER_LIST,
    payload: data
  }
}

export const deleteUser = () => {
  return {
    type: DELETE_USER
  }
}

export const getUserObj = (data) => {
  return {
    type: GET_USER_OBJ,
    payload: data
  }
}

export const FetchUserList = () => {
	return async (dispatch) => {
		try {
			dispatch(makeRequest());
			const userlist = await axios.get('https://jsonplaceholder.typicode.com/users');
			dispatch(getUserList(userlist.data));
		} catch (err) {
			dispatch(failRequest(err.message));
		}
	}
}

export const FetchUserObj = (id) => {
	return async (dispatch) => {
		try {
			dispatch(makeRequest());
			const userobj = await axios.get('https://jsonplaceholder.typicode.com/users/'+id);
			console.log('userobj: ',userobj.data);
			dispatch(getUserObj(userobj.data));
		} catch (err) {
			dispatch(failRequest(err.message));
		}
	}
}

export const RemoveUser = (id) => {
	return (dispatch) => {
		dispatch(makeRequest());
		axios.delete('https://jsonplaceholder.typicode.com/users'+id).then(res => {
			dispatch(deleteUser());
		}).catch(err => {
			dispatch(failRequest(err.message))
		});
	}
}

export const FunctionUpdateUser = (data,id) => {
	return(dispatch) => {
		dispatch(makeRequest());
		 const update = axios.put('https://jsonplaceholder.typicode.com/users/'+id,data).then(res => {
			console.log('update: ',update.data);
			dispatch(UpdateUser());
			toast.success('User updated');
		}).catch(err => {
			dispatch(failRequest(err.message))
		})
	}
}
