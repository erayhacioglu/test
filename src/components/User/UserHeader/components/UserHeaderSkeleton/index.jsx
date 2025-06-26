import "./user_header_skeleton.scss";

const UserHeaderSkeleton = () => {
  return (
    <div className="user_header_skeleton">
    <div className="user_profile_info">
      <div className="avatar_wrapper">
        <div className="avatar skeleton--circle" />
      </div>
      <div className="user_info">
        <div className="fullname skeleton--line" />
        <div className="job skeleton--line short" />
      </div>
    </div>

    <div className="user_actions">
      <div className="action_btn skeleton--rect" />
      <div className="action_btn skeleton--rect" />
    </div>
  </div>
  )
}

export default UserHeaderSkeleton