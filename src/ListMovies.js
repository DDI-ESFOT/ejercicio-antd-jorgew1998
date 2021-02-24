import { useEffect, useState } from 'react';
import { Col, Row, Button, Card, Modal, Descriptions } from 'antd';


const ListMovies = ({ movies }) => {

    const { Meta } = Card;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [omdbId, setOmdbId] = useState(null);
    const [currentMovie, setCurrentMovie] = useState(null);


    useEffect(() => {
        const getData = async () => {
            if (omdbId) {
                const response = await fetch(
                    `http://www.omdbapi.com/?apikey=537fcb7&i=${omdbId}`
                );
                const data = await response.json();
                console.log("data", data)
                setCurrentMovie(data);
            };
        };
        getData();
    }, [omdbId])



    const handleViweDetails = () => {
        setIsModalVisible(true);
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };



    return (
        <>
            <Row style={{ margin: 10 }}>
                {movies.map((movie, id) => (

                    <Col span={6}>
                        <Card
                            style={{ width: 200 }}
                            cover={
                                <img
                                    alt="example"
                                    src={movie.Poster}

                                />
                            }
                            actions={[
                                <Button type="link" onClick={handleViweDetails}>Ver mas </Button>,

                            ]}
                        >
                            <Meta type="flex" align="middle"
                                title={movie.Title}
                                description={movie.Year}
                            />
                        </Card>
                    </Col>


                ))
                }
            </Row>
            <Modal title="Detalles Pecilcula"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >

                {currentMovie && (
                    <Descriptions bordered>
                        <Descriptions.Item label="Titulo">{currentMovie.Title}</Descriptions.Item>
                        <Descriptions.Item label="Año">{currentMovie.Year}</Descriptions.Item>
                    </Descriptions>)}
            </Modal>
        </>
    );
}

export default ListMovies;
