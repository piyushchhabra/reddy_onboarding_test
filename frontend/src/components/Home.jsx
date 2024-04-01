import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getDashboardInfo } from "../utils/client";

import {
  MDBRow,
  MDBCol,
  MDBSpinner,
  MDBContainer,
  MDBBadge,
  MDBModal,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBIcon,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

const Home = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [showTeleModal, setShowTeleModal] = useState(false);
  const [currUser, setCurrUser] = useState(undefined);

  const mergedSorted = (lis) => {
    let res = [];

    for (var i = 0; i < lis.length; i++) {
      const user_name = lis[i].user_name;
      const existingUser = res.find((user) => user.user_name === user_name);
      if (existingUser) {
        existingUser.score += lis[i].score;
        if (lis[i].completed) existingUser.completed.push(lis[i].activity_name);
        else existingUser.not_completed.push(lis[i].activity_name);
      } else {
        let ul = {
          user_name: lis[i].user_name,
          completed: [],
          not_completed: [],
          score: lis[i].score,
        };
        if (lis[i].completed) ul.completed.push(lis[i].activity_name);
        else ul.not_completed.push(lis[i].activity_name);
        res.push(ul);
      }
    }
    return res;
  };
  const loadData = async () => {
    try {
      setShowLoader(true);
      const dataInfo = await getDashboardInfo();
      console.log(dataInfo);
      // const mergedData = dataInfo.reduce((acc, current) => {
      //   const existingUser = acc.find(
      //     (user) => user.user_name === current.user_name,
      //   );
      //   if (existingUser) {
      //     existingUser.score += current.score;
      //   } else {
      //     acc.push({ ...current });
      //   }
      //   return acc;
      // }, []);
      const mergedData = mergedSorted(dataInfo);
      mergedData.sort((a, b) => b.score - a.score);
      console.log(mergedData);
      setLeaderboardData(mergedData);
      setShowLoader(false);
    } catch (err) {
      toast.error("Error while fetching data");
      setShowLoader(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const toggleTeleModal = () => setShowTeleModal(!showTeleModal);
  const title = () => {
    return currUser !== undefined
      ? " Activity Report - " + currUser.user_name + "@reddy.io"
      : " Activity Report";
  };
  return (
    <MDBContainer>
      <MDBModal open={showTeleModal} setOpen={setShowTeleModal} tabIndex="-1">
        <MDBModalDialog scrollable>
          <MDBModalContent>
            <MDBModalHeader style={{ background: "#51829B" }}>
              <MDBModalTitle className="fw-bold" style={{ color: "#ffffff" }}>
                <MDBIcon fas icon="atlas" /> {title()}
              </MDBModalTitle>
              <MDBBtn className="btn-close" onClick={toggleTeleModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className="text-felt " style={{ fontSize: "18px" }}>
              {currUser !== undefined && currUser?.completed.length > 0 && (
                <span className="fw-bold">
                  {" "}
                  <MDBIcon fas icon="check-circle" /> Completed Activities:
                </span>
              )}
              {currUser?.completed?.map((item, index) => {
                return <MDBIcon fas icon="check-square" />;
              })}
              {currUser !== undefined && currUser?.not_completed.length > 0 && (
                <span className="fw-bold">
                  {" "}
                  <MDBIcon fas icon="times-circle" /> In-Completed Activities:
                </span>
              )}
              {currUser?.not_completed?.map((item, index) => {
                return (
                  <ul>
                    <li> {item}</li>{" "}
                  </ul>
                );
              })}
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      {showLoader && (
        <div
          className={"text-center"}
          style={{
            position: "fixed",
            left: "0%",
            top: "30%",
            width: "100%",
            height: "100%",
            zIndex: "9999",
          }}
        >
          <MDBSpinner color="info">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </div>
      )}

      <div>
        <MDBRow className="vh-100">
          <MDBCol md="4" style={{ backgroundColor: "#085b96" }}>
            <div style={{ alignItems: "left" }}>
              <img
                src={require("../assets/teamwork.jpeg")}
                alt=""
                style={{ width: "900px", maxWidth: "100%" }}
              ></img>
            </div>
            <div className="mt-2" style={{ textAlign: "center" }}>
              <p
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "32px",
                  fontWeight: 500,
                }}
              >
                {" "}
                Talent wins{" "}
                <span
                  style={{
                    color: "#000000",
                    background: "#ffffff",
                    padding: "5px",
                  }}
                  className="fw-bold"
                >
                  games
                </span>
                , but teamwork and intelligence win{" "}
                <span
                  style={{
                    color: "#000000",
                    background: "#ffffff",
                    padding: "5px",
                  }}
                  className="fw-bold"
                >
                  {" "}
                  championships
                </span>
                .{" "}
              </p>

              <MDBBtn
                id="buy-now-btn"
                className="fs-6 fw-bold mb-2 mt-3"
                size="md"
                color="info"
                onClick={() =>
                  alert(
                    "Login to your user account to complete more challenges",
                  )
                }
                style={{ fontFamily: '"Poppins", sans-serif !important' }}
              >
                Earn more points
              </MDBBtn>
            </div>
          </MDBCol>
          <MDBCol md="8" style={{ backgroundColor: "#081633" }}>
            <MDBTable
              align="middle"
              style={{ color: "white", fontSize: "18px" }}
            >
              <MDBTableHead>
                <tr>
                  <th
                    scope="col"
                    className="fw-bold"
                    style={{ color: "#34eb86" }}
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    className="fw-bold"
                    style={{ color: "#e73eed" }}
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="fw-bold"
                    style={{ color: "yellow" }}
                  >
                    Score
                  </th>
                  <th
                    scope="col"
                    className="fw-bold"
                    style={{ color: "#e32614" }}
                  >
                    Actions
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {leaderboardData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <p className="fw-normal mb-1">{index + 1}</p>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                            alt=""
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">{item?.user_name}</p>
                            <p className="text-muted mb-0">
                              {item?.user_name}@reddy.io
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">{item?.score}</p>
                      </td>

                      <td>
                        <MDBBtn
                          color="link"
                          rounded
                          size="sm"
                          onClick={() => {
                            setCurrUser(item);
                            toggleTeleModal();
                          }}
                        >
                          Report
                        </MDBBtn>
                      </td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
      <Toaster />
    </MDBContainer>
  );
};

export default Home;
