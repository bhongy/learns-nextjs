import fetch from "isomorphic-unfetch";
import Link from "next/link";
import MainLayout from "../components/MainLayout";

/*
shows: [
  { show: { id, name } }
]
*/
const Index = ({ shows }) => (
  <MainLayout>
    <h1>Batman TV Shows</h1>
    <nav>
      {shows.map(({ show }) => (
        <div key={show.id}>
          <Link
            as={`/show/${show.id}`}
            href={{ pathname: "/show", query: { id: show.id } }}
          >
            <a>{show.name}</a>
          </Link>
        </div>
      ))}
    </nav>
    <style jsx>{`
      a {
        color: #d05a6e;
        text-decoration: none;
      }

      a:visited {
        color: #f596aa;
      }

      a:active {
        color: #8b81c3;
      }
    `}</style>
  </MainLayout>
);

Index.getInitialProps = () =>
  fetch("https://api.tvmaze.com/search/shows?q=batman")
    .then(res => res.json())
    .then(shows => {
      console.log(`Show data fetched. Count: ${shows.length}`);
      return { shows };
    });

export default Index;
