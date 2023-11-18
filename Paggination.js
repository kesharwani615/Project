import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Paggination.css";

export default function Paggination(){
  const [image, setImage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImage, setCurrentImage] = useState([]);
  const record = 8;
  const lastIndex = currentPage * record;
  const firstIndex = lastIndex - record;
  const number = Math.ceil(image.length / record) + 1;
  const totalPage = [...Array(number).keys()].slice(1);

  useEffect(() => {
    Axios.get("https://picsum.photos/v2/list?page=2&limit=100").then((res) => {
      setImage(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    setCurrentImage(image.slice(firstIndex, lastIndex));
    // console.log(image.slice(firstIndex,lastIndex))
  }, [image, currentPage]);

  function handleNext() {
    if (currentPage !== number) {
      // console.log(typeof(currentPage)+currentPage);
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePrev() {
    if (currentPage !== 1) {
      // console.log(currentPage+'hello')
      setCurrentPage(currentPage - 1);
    }
  }

  function currentpagafUN(e) {
    setCurrentPage(parseInt(e.target.id));
  }

  return (
    <>
      {currentImage.map((data, i) => {
        return (
          // console.log(data)
          <img
            key={i}
            src={data.download_url}
            className="ImgFirst img-thumbnail"
            style={{ height: "250px", width: "250px", margin: "20px" }}
          />
        );
      })}

      <nav aria-label="Page navigation example" className="page">
        <ul className="pagination">
          <li className="page-item">
            <a onClick={handlePrev} className="page-link" href="#">
              Previous
            </a>
          </li>
          {totalPage.map((npage, i) => {
            return (
              <li key={i} className="page-item">
                <a
                  onClick={currentpagafUN}
                  id={i + 1}
                  className="page-link"
                  href="#"
                >
                  {npage}
                </a>
              </li>
            );
          })}
          <li className="page-item">
            <a onClick={handleNext} className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
