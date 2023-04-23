import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { FetchUserList, RemoveUser } from "../Redux/Action";
import { toast } from 'react-toastify';

const UserList = (props) => {
  useEffect(() => {
		props.loaduser();
  },[]);
	const handleDeleteUser = (id) => {
		if(window.confirm('do you want to remove?')) {
			props.removeuser(id);
			props.loaduser();
			toast.success('user removed successfully.');
		}
	}
  return (
		props.user.loading?<div><h2>Loading...</h2></div>:
		props.user.errmessage?<div><h2>{props.user.errmessage}</h2></div>:
    <div className="card">
      <div className="card-header">
        <h2>User List</h2>
      </div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead className="bg-dark text-white">
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>User Name</td>
              <td>Phone</td>
              <td>Website</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
						{
							props.user.userlist && props.user.userlist.map(item => 
								<tr key={item.id}>
									<td>{item.id}</td>
									<td>{item.name}</td>
									<td>{item.username}</td>
									<td>{item.phone}</td>
									<td>{item.website}</td>
									<td>
										<Link to={`/edit/${item.id}`} className="btn btn-primary">Detail</Link>
										<button onClick={()=>{handleDeleteUser(item.id)}} className="btn btn-danger">Delete</button>
									</td>
								</tr>
							)
						}
					</tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loaduser: () => dispatch(FetchUserList()),
		removeuser: (id) => dispatch(RemoveUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (UserList);
