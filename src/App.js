import './App.css';
import Movies from "./ListMovies";
import React, { useEffect, useState } from "react";
import { Input, Space, Row, Col } from 'antd';
import { AudioOutlined } from '@ant-design/icons';



function App() {

  document.title = "List of Movies";
  const [movies, setMovies] = useState([]);
  const [elementMovie, setElementMovie] = useState('avengers');

  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://www.omdbapi.com/?apikey=537fcb7&s=${elementMovie}`);
      const dataMovies = await response.json();
      setMovies(dataMovies.Search);
    }
    getData();

  }, [elementMovie]);

  const onSearch = (value) => {
    setElementMovie(value);
  }


  return (
    <>
      <Row>
        <Col span={10}></Col>
        <Col span={14}><Space direction="vertical">
          <Search
            placeholder="Nombre "
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={onSearch}

          />
        </Space></Col>
      </Row>
      <Row>
        <Col span={2}></Col>
        <Col span={22}><Movies movies={movies} /></Col>
      </Row>
    </>
  );
}

export default App;
