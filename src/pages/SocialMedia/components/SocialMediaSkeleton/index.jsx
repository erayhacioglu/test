import "./social_media_skeleton.scss";

const SocialMediaSkeleton = ({ count }) => {
  return (
    <div className="social_media_skeleton_container">
      {Array.from({ length: count }, (_, idx) => (
        <div className="social_media_skeleton_item" key={idx} />
      ))}
    </div>
  );
};

export default SocialMediaSkeleton;
