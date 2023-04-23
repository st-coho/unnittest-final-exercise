import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FetchUserObj } from "../Redux/Action";
import { useDispatch } from "react-redux";

const UpdateUser = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userobj = useSelector((state) => state.user.userobj);
  useEffect(() => {
    dispatch(FetchUserObj(id));
  }, []);
  return (
    <div className="card">
      <h1>Detail</h1>
      {userobj && (
        <div key={userobj.id}>
          <p>
            <b>ID:</b> {userobj.id}
          </p>
          <p>
            <b>Name:</b> {userobj.name}
          </p>
          <p>
            <b>User Name:</b> {userobj.username}
          </p>
          <p>
            <b>Phone:</b> {userobj.phone}
          </p>
          <p>
            <b>Email:</b> {userobj.email}
          </p>
          <p>
            <b>Website:</b> {userobj.website}
          </p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserObj: (id) => dispatch(FetchUserObj(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
