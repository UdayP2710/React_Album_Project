import React, { useEffect, useState } from "react";

import Styles from "./imagelist.module.css";
import Edit from "../../images/edit.png";
import Delete from "../../images/trash-bin.png";
import { db } from "../../firebase";
import { onSnapshot, doc, deleteDoc } from "firebase/firestore";
export const Images = ({
  editImageFunction,
  image,
  setImage,
  docid,
  subcollectionref,
}) => {
  //......................//
  //........Delete function to remove image from database........//
  const deleteImage = async (id) => {
    console.log("delete");
    const docref = doc(db, "Albums", docid, "Images", id);
    await deleteDoc(docref);
  };
  //.....................//
  //....performing side-effect inside useEffect hook...//
  //.....Fetching Images list from database and updating image state......//

  useEffect(() => {
    console.log("imageuseeffect");
    const handelImageLoad = () => {
      const unsub = onSnapshot(subcollectionref, (snap) => {
        const data = snap.docs.map((image) => {
          return { ...image.data(), id: image.id };
        });

        setImage([...data]);
      });
    };
    handelImageLoad();
  }, []);
  return (
    <>
      {image.length === 0 ? (
        <h1>No Image Found</h1>
      ) : (
        <div className={Styles.imagecont}>
          {image.map((imgobj, i) => {
            return (
              <div key={i} className={Styles.imagecard}>
                <div className={Styles.image}>
                  <img src={imgobj.url} alt="image" />
                </div>
                <hr />
                <div className={Styles.title}>
                  <h1>{imgobj.title}</h1>
                </div>

                <div className={Styles.btn}>
                  <div
                    onClick={() =>
                      editImageFunction({
                        imgobj,
                        subcollectionref,
                        docid,
                      })
                    }
                    className={Styles.edit}
                  >
                    <img src={Edit} alt="edit"></img>
                  </div>
                  <div
                    className={Styles.delete}
                    onClick={(e) => deleteImage(imgobj.id)}
                  >
                    <img src={Delete} alt="delete"></img>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
