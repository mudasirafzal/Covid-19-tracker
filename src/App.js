import React, { useEffect, useState } from "react";
import { Grid, Container, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./index.css";
import countryCode from "./code";

export default function App() {
  const [countryData, setCountryData] = useState([]);
  const [worldData, setWorldData] = useState({});
  const [date, setDate] = useState(1584724653093);
  const [search, setSearch] = useState("");
  const useStyles = makeStyles({
    root: {
      backgroundColor: "#23232399",
      marginBottom: 10
    }
  });
  const classes = useStyles();
  useEffect(() => {
    axios.get("https://corona.lmao.ninja/v2/countries").then(res => {
      setCountryData([...res.data]);
    });

    axios.get("https://corona.lmao.ninja/v2/all").then(res => {
      setWorldData(res.data);
      setDate(res.data.updated);
    });
  }, []);

  const handleChnage = e => {
    setSearch(e.target.value);
  };

  let data = countryData;
  /* var updatedDate = new Date(date);
  var day =
    updatedDate.getDate() +
    "-" +
    (updatedDate.getMonth() + 1) +
    "-" +
    updatedDate.getFullYear();
  var time = updatedDate.getHours() + " : " + updatedDate.getMinutes(); */

  if (search.length > 0) {
    let searchResult = countryData.filter(item =>
      item.country.toLowerCase().includes(search.toLowerCase())
    );
    data = searchResult;
  } else {
    data = countryData;
  }

  return (
    <Container maxWidth="lg" className="app-container">
      {countryData.length > 0 ? (
        <Grid container>
          <Grid item md={4} xs={12} style={{ marginRight: "10px" }}>
            <h1 className="heading-one">COVID19 </h1>
            <h1 className="heading-two">UPDATES </h1>
          </Grid>

          <Grid
            item
            md={7}
            xs={12}
            style={{
              display: "flex",
              alignItems: "flex-end"
            }}
          >
            <Grid container>
              <Grid item md={3} xs={4}>
                <div className="world-data-item">
                  <div>
                    <p className="caption" style={{ color: "#3498db" }}>
                      Total Cases
                    </p>
                    <p className="title-large" style={{ color: "#3498db" }}>
                      {worldData.cases}
                    </p>
                  </div>
                </div>
              </Grid>

              <Grid item md={3} xs={4}>
                <div className="world-data-item">
                  <div>
                    <p className="caption" style={{ color: "#e74c3c" }}>
                      Total Deaths
                    </p>
                    <p className="title-large" style={{ color: "#e74c3c" }}>
                      {worldData.deaths}
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item md={3} xs={4}>
                <div className="world-data-item">
                  <div>
                    <p className="caption" style={{ color: "#27ae60" }}>
                      Total Recovered
                    </p>
                    <p className="title-large" style={{ color: "#27ae60" }}>
                      {worldData.recovered}
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item md={3} xs={4}>
                <div className="world-data-item">
                  <div>
                    <p className="caption" style={{ color: "#d6d118" }}>
                      Active Cases
                    </p>
                    <p className="title-large" style={{ color: "#d6d118" }}>
                      {worldData.active}
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item md={3} xs={4}>
                <div className="world-data-item">
                  <div>
                    <p className="caption" style={{ color: "#27ae60" }}>
                      Total Recovery Rate
                    </p>
                    <p className="title-large" style={{ color: "#27ae60" }}>
                      {(
                        Math.round(
                          ((100 * worldData.recovered) / worldData.cases) * 100
                        ) / 100
                      ).toFixed(2)}{" "}
                      %
                    </p>
                  </div>
                </div>
              </Grid>

              <Grid item md={3} xs={4}>
                <div className="world-data-item">
                  <div>
                    <p className="caption" style={{ color: "#e74c3c" }}>
                      Total Death Rate
                    </p>
                    <p className="title-large" style={{ color: "#e74c3c" }}>
                      {Math.round(
                        ((100 * worldData.deaths) / worldData.cases) * 100
                      ) / 100}{" "}
                      %
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <input
              className="input-box"
              placeholder="Search Country...."
              onChange={handleChnage}
            />
          </Grid>

          <Grid item md={12} xs={12} className="heading-wrapper">
            <Grid container>
              <Grid item xs={2} md={2} className="flex-start">
                <p className="caption">Country</p>
              </Grid>

              <Grid item md={2} xs={2} className="flex-start">
                <p className="caption">Total Cases</p>
              </Grid>

              <Grid item md={2} xs={2} className="flex-start">
                <p className="caption">Today Cases</p>
              </Grid>

              <Grid item md={2} xs={2} className="flex-start">
                <p className="caption">Today Deaths</p>
              </Grid>

              <Grid item md={2} xs={2} className="flex-start">
                <p className="caption">Total Deaths</p>
              </Grid>
              <Grid item md={2} xs={2} className="flex-start">
                <p className="caption">Recovered</p>
              </Grid>
            </Grid>
          </Grid>

          {data.length > 0 ? (
            data.map(item => {
              /*  let recoveredRate = (
                Math.round(((100 * item.recovered) / item.cases) * 100) / 100
              ).toFixed(2);
              let deathsRate = (
                Math.round(((100 * item.deaths) / item.cases) * 100) / 100
              ).toFixed(2); */
              const nationCode = countryCode.find(name => {
                return name.Name === item.country;
              });

              let image = `https://www.countryflags.io/${
                nationCode ? nationCode.Code : null
              }/shiny/64.png`;

              return (
                <Grid item md={12}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={9} md={2} className="flex-start">
                          <img
                            src={image}
                            width="50px"
                            alt="flag"
                            style={{ margin: "3px", marginRight: "20px" }}
                          />
                          <p className="titile">{item.country}</p>
                        </Grid>
                        <Grid item xs={3} md={2} className="flex-start">
                          <div
                            className="country-data-item"
                            style={{ backgroundColor: "#3498db" }}
                          >
                            <div>
                              <p className="caption text-hide">Total Cases</p>
                              <p className="titile">{item.cases}</p>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={3} md={2} className="flex-start">
                          <div
                            className="country-data-item"
                            style={{ backgroundColor: "#3498db" }}
                          >
                            <div>
                              <p className="caption text-hide">Today Cases</p>
                              <p className="titile">{item.todayCases}</p>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={3} md={2} className="flex-start">
                          <div
                            className="country-data-item"
                            style={{ backgroundColor: "#e74c3c" }}
                          >
                            <div>
                              <p className="caption text-hide">Today Deaths</p>
                              <p className="titile">{item.todayDeaths}</p>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={3} md={2} className="flex-start">
                          <div
                            className="country-data-item"
                            style={{ backgroundColor: "#e74c3c" }}
                          >
                            <div>
                              <p className="caption text-hide">Total Deaths</p>
                              <p className="titile">{item.deaths}</p>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={3} md={2} className="flex-start">
                          <div
                            className="country-data-item"
                            style={{ backgroundColor: "#27ae60" }}
                          >
                            <div>
                              <p className="caption text-hide">Recovered</p>
                              <p className="titile">{item.recovered}</p>{" "}
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <p className="footer-text">No results</p>
          )}

          <Grid item xs={12} md={12} className="footer">
            <div>
              <p className="footer-text">
                Developed by{" "}
                <a
                  target="blank"
                  href="https://www.linkedin.com/in/mudasir-afzal-61824678/"
                >
                  {" "}
                  Mudasir Afzal
                </a>
              </p>
            </div>
          </Grid>

          <div className="app-wrapper"></div>
        </Grid>
      ) : (
        <Grid className="loading-screen">
          <img src={require("./assets/loading.gif")} alt="gif" width="40px" />
        </Grid>
      )}
    </Container>
  );
}
