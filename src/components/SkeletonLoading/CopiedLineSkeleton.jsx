import "./skeleton_loading.scss";

const CopiedLineSkeleton = ({count = 3}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div className="copied_line_container_skeleton" key={idx}>
          <div className="copied_line_group">
            <div className="skeleton_icon" />
            <div className="skeleton_text" />
          </div>
          <div className="skeleton_button" />
        </div>
      ))}
    </>
  );
}

export default CopiedLineSkeleton