import Parser from 'html-react-parser'
import { useState } from 'react'
import { Button, Card } from "react-bootstrap"
import {Link} from "react-router-dom"
import { ShowComment } from './comment'
import { PostAPI } from './funcPostAPI'

export const ShowCart = ({post, cateList, authorList}) => {
    var title, modifiedDate, content, categories, authorName, comLink
    title = post.title.rendered
    modifiedDate = post.modified
    content = post.content.rendered
    categories = GetCategory(post.categories, cateList).join(", ")
    authorName = GetAuthor(post.author, authorList)
    comLink = post._links.replies[0].href

    const [text, setText] = useState("")
    const [addComment, setAddComment] = useState(null)

    //comment
    function postComment() {
        console.log("working")
        PostAPI(post, "Anonymous", text).then((response) => {
            setAddComment(response)
        })
        setText("")
    }
    return (
        <>
            <Card border="secondary" style={{border: "none"}}>
                <Card.Header style={{backgroundColor:"#253363", color: "#FFF", fontWeight: "bold", fontSize: "larger"}}>
                    {title}
                </Card.Header>
                <Card.Footer className="text-muted"><b>Categories: </b>{categories}</Card.Footer>
                <Card.Body bg="Light">
                    {Parser(content)}
                    <p className='modified'>Modified: {modifiedDate} by {authorName}</p>
                </Card.Body>
            </Card>
            <div style={{backgroundColor: "white", marginTop: "1vh", borderRadius: 5}}>
                <textarea className='commentArea' value={text} placeholder="What do you think?" onChange={(val) => setText(val.target.value)}></textarea>
                <Button onClick={() =>postComment()}>Comment</Button>
            </div>
            <ShowComment commentLink={comLink} addComment={addComment}></ShowComment>
        </>
    )
}

export const ShowShortCart = ({post, cateList, authorList}) => {
    var title, modifiedDate, excerpt, categories, authorName
    title = post.title.rendered
    modifiedDate = post.modified
    excerpt = post.excerpt.rendered
    categories = GetCategory(post.categories, cateList).join(", ")
    authorName = GetAuthor(post.author, authorList)

    return (
        <Card border="secondary" style={{height: "100%", border: "none"}}>
            <Card.Header style={{backgroundColor:"#253363", color: "#FFF", fontWeight: "bold", fontSize: "larger"}}>
                {title}
            </Card.Header>
            <Card.Footer className="text-muted"><b>Categories: </b>{categories}</Card.Footer>
            <Card.Body bg="Light">
                {Parser(excerpt)}
                <p className='modified'>Modified: {modifiedDate} by {authorName}</p>
            </Card.Body>
            <Link to={{pathname : `/Post/${post.id}`}}>
                <Button style={{width:"100%"}}>Read</Button>
            </Link>
        </Card>
    )
}

function GetCategory(cateIDList, cateList) {
    var cateStr = cateIDList.map(id => cateList.filter(cateID => id === cateID.id))
    cateStr = cateStr.map(cateID => cateID[0].name)
    return cateStr
}

function GetAuthor(author, authorList) {
    var authorName = authorList.filter(authorID => author === authorID.id)
    authorName = authorName[0].name
    return authorName
}