import "./skeleton_loading.scss";

const FormFieldSkeleton = ({ type = "basic", count = 3,showAddItems = false,
  addItemCount = 3 }) => {
  return (
    <>
    {showAddItems && (
        <div className="add_form_item_container_skeleton">
          {Array.from({ length: addItemCount }).map((_, idx) => (
            <div className="add_form_item_skeleton" key={`add-${idx}`} />
          ))}
        </div>
      )}
      {Array.from({ length: count }).map((_, idx) =>
        type === "withDelete" ? (
          <div className="form_group_with_delete_skeleton" key={idx}>
            <div className="form_group">
              <div className="form_icon_skeleton" />
              <div className="form_input_skeleton" />
            </div>
            <div className="form_delete_skeleton" />
          </div>
        ) : (
          <div className="form_group_skeleton" key={idx}>
            <div className="form_label_skeleton" />
            <div className="form_input_skeleton" />
          </div>
        )
      )}
    </>
  );
}

export default FormFieldSkeleton