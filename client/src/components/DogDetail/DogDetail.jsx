import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getDogDetail } from "../../actions/action";
import { Link, useParams } from "react-router-dom";

export function DogDetail(props) {
  let dispatch = useDispatch();
  let { id } = useParams();
  let detail = useSelector((state) => state.dogDetail);

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearDetail());
    };
  }, []);

  let arrTemp = [];
  detail.temperaments?.forEach((temp) => {
    arrTemp.push(temp.name);
  });

  let tempStr = arrTemp.join(", ");

  return (
    <>
      {!detail ? (
        <h3>cargando...</h3>
      ) : (
        <div>
          <Link to={"/home"}>
            <h1>home</h1>
          </Link>
          <img src={detail.image} alt={detail.name} />
          <h2>{detail.name}</h2>
          <p>{tempStr}</p>
          <p>Weight: {detail.weight}</p>
          <p>Height: {detail.height}</p>
          <p>Life Span: {detail.life_span}</p>
        </div>
      )}
    </>
  );
}
