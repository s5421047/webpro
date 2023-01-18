import { useEffect, useState } from "react";
import { fetchImages } from "./api";


function Header() {
  return (
    <header className="hero is-warning is-bold">
      <div className="hero-body-padding-tablet">
        <div className="container">
          <h1 className="title"><br/>
          <div class="notification is-dark">
  <p>３種類から好きな動物を選んで12枚の写真を見ることができます。</p>
</div>

          </h1>
        </div>
      </div>
    </header>
  );
}

function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
        <img src={props.src} alt="cute animals" />
        </figure>
      </div>
    </div>
  );
}
function Loading() {
  return <p>Loading...</p>;
}
function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
}
function Form(props) {
    function handleSubmit(event) {
      event.preventDefault();
      const { breed } = event.target.elements;
      props.onFormSubmit(breed.value);
    }
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="field has-addons">
              <div className="control is-expanded">
                <div className="select is-fullwidth">
                  <select name="breed" defaultValue="shibes">
                    <option value="shibes">犬</option>
                    <option value="cats">猫</option>
                    <option value="birds">鳥</option>
                  </select>
                </div>
              </div>
              <div className="control">
                <button type="submit" className="button is-success">
                  更新
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
   function Main() {
       const [urls, setUrls] = useState(null);
       useEffect(() => {
         fetchImages("shibes").then((urls) => {
           setUrls(urls);
         });
       }, []);
       function reloadImages(breed) {
        fetchImages(breed).then((urls) => {
          setUrls(urls);
        });
      }
       return (
         <main>
          <section className="section">
            <div className="container">
            <Form onFormSubmit={reloadImages} />
            </div>
         </section>
           <section className="section">
             <div className="container">
               <Gallery urls={urls} />
             </div>
           </section>
         </main>
       );
       }
     


function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        
        <p>
          <a href="https://shibe.online/">shibe.online API</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;