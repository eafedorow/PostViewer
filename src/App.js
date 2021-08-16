import React, {useMemo, useRef, useState} from 'react';
import Counter from "./components/Counter";
import './components/styles/App.css';
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";

const App = () => {

    const [posts, setPosts] = useState([
        {id: 1, title:'яы', body: 'aa'},
        {id: 2, title:'аи', body: 'zz'},
        {id: 3, title:'бя', body: 'bb'},
    ]);

    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);

    const sortedPosts = useMemo(() =>{
        console.log('Function working')
        if(filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.query]))
        }
        return  posts;
    }, [filter.sort, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()));
    }, [filter.query, sortedPosts]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
    <div className='App'>
        <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
            Создать пост
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost}/>
        </MyModal>
        <hr style={{margin: '15px 0'}}/>
        <PostFilter
            filter = {filter}
            setFilter={setFilter}
        />
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS'/>
    </div>);
}

export default App;
