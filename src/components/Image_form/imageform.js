import React, { useEffect, useRef, useState } from "react";
import Styles from "./imageform.module.css";
import BackImage from "../../images/back.png";
export const Imageform = ({
  imagetoedit,
  setForm,
  isUpdateimage,
  addImage,
  clickBack,
  form,
  setUpdate,
}) => {
  const imageTitle = useRef();
  const imageUrl = useRef();
  useEffect(() => {
    if (!isUpdateimage) return;
    imageTitle.current.value = imagetoedit.imgobj.title;
    imageUrl.current.value = imagetoedit.imgobj.url;
    console.log(imagetoedit.imgobj.title);
  }, [isUpdateimage]);

  const clearInputBox = () => {
    imageTitle.current.value = "";
    imageUrl.current.value = "";
  };
  return (
    <>
      <div className={Styles.form_container}>
        <div className={Styles.image_cont}>
          <img
            className={Styles.backimage}
            onClick={() => {
              setUpdate(false);
              clickBack(true);
            }}
            src={BackImage}
            alt="back"
          ></img>
        </div>

        {form ? (
          <div className={Styles.form}>
            <h1>{isUpdateimage ? "Edit Image" : "Add Image"}</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addImage({
                  title: imageTitle.current.value,
                  url: imageUrl.current.value,
                });
                clearInputBox();
              }}
            >
              <input
                className={Styles.input}
                type="text"
                placeholder="Title"
                ref={imageTitle}
              />
              <input
                className={Styles.input}
                type="text"
                placeholder="Image Url"
                ref={imageUrl}
              />

              <button
                onClick={() => {
                  clearInputBox();
                }}
                className={Styles.btn}
                id={Styles.clear}
                type="button"
              >
                Clear
              </button>
              <button className={Styles.btn} id={Styles.create}>
                {isUpdateimage ? "Update" : "Create"}
              </button>
            </form>
            <div>
              <button
                className={Styles.btn}
                id={Styles.cancel}
                onClick={() => {
                  setUpdate(false);
                  clearInputBox();
                  setForm(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            className={Styles.btn}
            id={Styles.add}
            onClick={() => setForm(true)}
          >
            Add Image
          </button>
        )}
      </div>
    </>
  );
};
