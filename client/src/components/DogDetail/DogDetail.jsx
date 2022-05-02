import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, deleteDog, getDogDetail } from "../../actions/action";
import { useHistory, useParams } from "react-router-dom";
import { Nav } from "../Nav/Nav";
import s from "./DogDetail.module.css";
import { Footer } from "../Footer/Footer";
import { Modal } from "../Modal/Modal";

export function DogDetail() {
  let dispatch = useDispatch();
  let { id } = useParams();
  let detail = useSelector((state) => state.dogDetail);
  let history = useHistory();
  let [winModal, setWinModal] = useState(false);

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
    setWinModal(true);
    setTimeout(() => {
      history.push("/home");
    }, 3000);
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
      <div>
        <Modal state={winModal} handleChangeModal={setWinModal}>
          <p>The dog was deleted</p>
          <h3>You can continue visiting the page</h3>
        </Modal>
      </div>
    </>
  );
}
