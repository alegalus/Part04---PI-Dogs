import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, deleteDog, getDogDetail } from "../../actions/action";
import { useHistory, useParams } from "react-router-dom";
import { Nav } from "../Nav/Nav";
import s from "./DogDetail.module.css";
import { Footer } from "../Footer/Footer";

export function DogDetail(props) {
  let dispatch = useDispatch();
  let { id } = useParams();
  let detail = useSelector((state) => state.dogDetail);
  let history = useHistory();

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearDetail());
    };
  }, []);

  let handleDelete = () => {
    dispatch(deleteDog(id));
    alert("¡¡The dog was deleted");
    history.push("/home");
  };

  let arrTemp = [];
  detail.temperaments?.forEach((temp) => {
    arrTemp.push(temp.name);
  });

  let tempStr = arrTemp.join(", ");

  return (
    <>
      <div id={s.mainDetail}>
        <Nav />
        <div id={s.detail}>
          <img src={detail.image} alt={detail.name} />
          <h2>{detail.name}</h2>
          <p className={s.temp}>{tempStr}</p>
          <p>Weight: {detail.weight}</p>
          <p>Height: {detail.height}</p>
          <p>Life Span: {detail.life_span}</p>
          {id.length <= 3 ? null : (
            <button onClick={handleDelete}>Delete Dog</button>
          )}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}
