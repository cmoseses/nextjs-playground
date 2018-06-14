import Layout from "../components/MyLayout.js";
import Link from "next/link";
import fetch from 'isomorphic-unfetch';

const PostLink = props => (
  <li>
    <Link href={`/post?title=${props.title}`} as={`/p/${props.title}`} >
      <a>{props.title}</a>
    </Link>
  </li>
);

const Index = (props) => (
  <Layout>
    <h1>next.j1s</h1>
    <ul>
      <PostLink title="发布" />
      <PostLink title="导航路由" />
      <PostLink title="路由面具" />
      <PostLink title="获取数据" />
      <PostLink title="样式" />
    </ul>
    <ul>
      {props.shows.map(({show}) => (
        <li key={show.id}>
          <Link as={`/f/${show.id}`} href={`/film?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
    <style jsx>{`
      h1 {
        font-family: "Arial";
        color: red;
      }
    `}</style>
    <style jsx global>{`
      ul {
        list-style: none;
        padding: 0;
      }
    `}</style>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Index