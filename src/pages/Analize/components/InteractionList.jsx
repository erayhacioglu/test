import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInteractions } from "../../../redux/slices/AnalizeSlice";

export default function InteractionList({ cardId }) {
  const dispatch = useDispatch();

  const { loading, error, items = [] } = useSelector((state) => state.analize);

  useEffect(() => {
    if (cardId) {
      dispatch(fetchInteractions(cardId));
    }
  }, [cardId, dispatch]);

  return (
    <div className="interaction-list">
      <h2 className="chart-title">Ziyaretçi Listesi (IP Bazlı)</h2>

      {loading && <div>Yükleniyor...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div className="interaction-list-wrapper">
        {items.map((item) => (
          <div key={item.ip} className="interaction-item">
            <div className="ip">{item.ip}</div>
            <div className="counts">
              <span className="view">👁 {item.view}</span>
              <span className="download">⬇️ {item.download}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
