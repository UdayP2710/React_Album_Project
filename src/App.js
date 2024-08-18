import React, { useEffect, useState } from "react";
import "./app2.css";

import { Navbar } from "./components/Navbar/navbar.js";
import { Albumform } from "./components/Album_Form/albumform.js";
import { Imageform } from "./components/Image_form/imageform.js";
import { Albumlist } from "./components/Albumlist/albumlist.js";
import { Images } from "./components/ImageList/imagelist.js";
//Third party Components Import.........
import Spinner from "react-spinner-material";
//Importing toast.......
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// firebase databse imports.........
import { db } from "./firebase.js";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
function App() {
  const [album, setAlbum] = useState([]);
  const [home, setScreen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState([]);
  const [docid, setDocId] = useState("");
  const [subcollection, setSubCollection] = useState({});
  const [isUpdateimage, setUpdate] = useState(false);
  const [form, setForm] = useState(false);
  const [imagetoedit, setEditImage] = useState({});
  ////...............................////
  const colref = collection(db, "Albums"); //collection refernece......

  ////...............................////

  //.....add albums to the databse using addAlbums function.......//
  const addAlbums = async (data) => {
    const docref = await addDoc(colref, data);
    setAlbum([{ ...data, id: docref.id }, ...album]);
    toast.success("Album Added Successfully....");
  };
  const createSubcollection = async (id) => {
    const albumdoc_ref = doc(db, "Albums", id);
    const subcollectionref = collection(albumdoc_ref, "Images");
    setSubCollection(subcollectionref);
  };
  //......Creating subcollection inside specific document and storing image title and url........//
  const addImage = async (image_data) => {
    if (isUpdateimage) {
      const { imgobj, subcollectionref, docid } = imagetoedit;
      const docref = doc(db, "Albums", docid, "Images", imgobj.id);
      await updateDoc(docref, image_data);
      toast.success("Image Updated Successfully....");
      setUpdate(false);
      setForm(false);

      return;
    }
    const imagedoc = await addDoc(subcollection, image_data);
    setImage([{ ...image_data, id: imagedoc.id }, ...image]);
    toast.success("Image Added Successfully....");
  };

  //........... Edit Image function ...........//
  const editImageFunction = (imagedetail) => {
    setUpdate(true);
    setEditImage(imagedetail);
    setForm(true);
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      const unsub = onSnapshot(colref, (snap) => {
        let data = snap.docs.map((album) => {
          const id = album.id;
          return { ...album.data(), id };
        });
        setAlbum([...data]);
        setLoading(false);
      });
    };
    fetchAlbums();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      {home ? (
        <>
          <Navbar />
          <Albumform albumfn={addAlbums} clickBack={setScreen} />
          {loading ? (
            <div className="spinner">
              <Spinner
                radius={100}
                color={"#065418"}
                stroke={3}
                visible={true}
              />
            </div>
          ) : (
            <Albumlist
              album_collection={album}
              setDocId={setDocId}
              clickAlbum={setScreen}
              createSubcollection={createSubcollection}
            />
          )}
        </>
      ) : (
        <>
          <Navbar />
          <Imageform
            imagetoedit={imagetoedit}
            setForm={setForm}
            isUpdateimage={isUpdateimage}
            setUpdate={setUpdate}
            addImage={addImage}
            clickBack={setScreen}
            form={form}
          />
          <Images
            editImageFunction={editImageFunction}
            setForm={setForm}
            image={image}
            setImage={setImage}
            docid={docid}
            subcollectionref={subcollection}
          />
        </>
      )}
    </div>
  );
}

export default App;
