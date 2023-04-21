import "./historybox.css";
import cookie from "../../hooks/useCookie";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";
const HistoryBox = ({ fun1 }) => {
  let user = cookie("get", "user");
  let [historylist, sethistorylist] = useState([]);
  useEffect(() => {
    axios
      .post("/harc/gethistory", {
        user: user,
      })
      .then((res) => {
        if (res.data.msg != "failed") {
          sethistorylist(res.data.msg);
        } else {
          sethistorylist([]);
        }
      });
  }, []);

  const remhis = (x, y, z) => {
    axios
      .post("/harc/remhis", {
        user: user,
        postid: x,
      })
      .then((res) => {
        if (res.data.msg == "failed") {
          alert("Something went wrong");
        } else {
          historylist.splice(y, 1);
          sethistorylist([...historylist]);
          console.log(y);
        }
      });
  };

  return (
    <>
      <div className={"hlmc"}>
        <div className={"hlc"}>
          <img
            src={"/assets/crossicon.png"}
            style={{
              position: "absolute",
              top: "0",
              right: "10px",
              width: "30px",
              cursor: "pointer",
            }}
            onClick={fun1}
          />
          <div className={"hl"}>
            {historylist.length != 0 ? (
              historylist.map((d, i) => {
                return (
                  <>
                    <div className={"hit"} key={i}>
                      <p className={"hittitle"}>
                        <Link to={"/post/" + d.postid}>{d.posttitle}</Link>
                      </p>
                      <p className={"hitdate"}>
                        {moment.unix(d.epoch).format("dd, DD/MM/YY")}
                      </p>
                      <p>
                        <img
                          src={"/assets/crossicon.png"}
                          onClick={() => remhis(d.postid, i)}
                        />
                      </p>
                    </div>
                  </>
                );
              })
            ) : (
              <h1>No history to show.</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default HistoryBox;
