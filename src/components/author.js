import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const ShowAuthorPage = () => {
    const [user, setUser] = useState([])
    //id, name, avatar_urls.96
    const GetUser = async () => {
        const user = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/users')
        setUser(user.data)
    }
    useEffect(
        () => {
            GetUser()
        },
        [],
      )

    return (
        <>
            <Container>
                {
                    user.map(person => {
                        return (
                            <Row key={person.id} style={{justifyContent: "center"}}>
                                <Col md={4} style={{ marginTop: 20 }}>
                                    <Card.Header className="text-center" style={{backgroundColor:"#253363", color: "#FFF", fontWeight: "bold", fontSize: "larger"}}>
                                        {person.name}
                                    </Card.Header>
                                    <Card.Body className="text-left" style={{backgroundColor: "white"}}>
                                        <p>
                                            <b>ID:</b> {person.id}
                                            <br></br>
                                            <b>slug:</b> {person.slug}
                                        </p>
                                    </Card.Body>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Container>
        </>
    );

}

export default ShowAuthorPage