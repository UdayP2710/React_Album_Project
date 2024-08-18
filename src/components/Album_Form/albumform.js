import React, { useRef, useState } from "react";
import Styles from "./albumform.module.css";
import BackImage from "../../images/back.png";
export const Albumform = ({ albumfn, homescreen, clickBack }) => {
  const inputval = useRef();
  const [form, setForm] = useState(false);
  const clearInputBox = () => {
    inputval.current.value = "";
  };
  return (
    <>
      <div className={Styles.form_container}>
        {form ? (
          <div className={Styles.form}>
            <h1>Create Album</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                return albumfn({ title: inputval.current.value });
              }}
            >
              <input
                className={Styles.input}
                type="text"
                placeholder="Album Name"
                ref={inputval}
              />

              <button
                onClick={() => clearInputBox()}
                className={Styles.btn}
                id={Styles.clear}
                type="button"
              >
                Clear
              </button>
              <button className={Styles.btn} id={Styles.create}>
                Create
              </button>
            </form>
            <div>
              <button
                className={Styles.btn}
                id={Styles.cancel}
                onClick={() => setForm(false)}
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
            Add Album
          </button>
        )}
      </div>
    </>
  );
};
