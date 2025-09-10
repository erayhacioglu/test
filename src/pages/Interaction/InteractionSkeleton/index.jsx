import "./interaction_skeleton.scss";

const InteractionSkeleton = ({ cardSize = 6, cardControlSize = 2 }) => {
  return (
    <div className="interaction_skeleton_container">
      {Array.from({ length: cardSize })?.map((_, key) => (
        <div className="interaction_mini_card_container" key={key}>
          <div className="interaction_mini_card" />
          <div className="interaction_mini_card_controls">
            {Array.from({ length: cardControlSize })?.map((_, idx) => (
              <div className="interaction_mini_card_btn" key={idx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InteractionSkeleton;
