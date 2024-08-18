import React from "react";
import albumImage from "../../images/image.png";
import Styles from "./album.module.css";
export const Albumlist = ({
  album_collection,
  clickAlbum,
  setDocId,
  createSubcollection,
}) => {
  return (
    <>
      <div className={Styles.container}>
        {album_collection.map((albums) => {
          return (
            <>
              <div
                onClick={() => {
                  clickAlbum(false);
                  setDocId(albums.id);
                  createSubcollection(albums.id);
                }}
                className={Styles.album_div}
              >
                <img
                  className={Styles.image}
                  src={albumImage}
                  alt="albums"
                ></img>
                <h2>{albums.title}</h2>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
